import { Component, Input, forwardRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { map, filter, take, combineLatest, startWith, withLatestFrom, debounceTime, tap, switchMap, distinctUntilChanged, throttleTime } from 'rxjs/operators';

import { Store, select, createSelector } from '@ngrx/store';

import { FormGroupState, ResetAction, SetValueAction, FormControlState, unbox } from 'ngrx-forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { StartFormGroupValue, StartFormGroupInitialState } from '@pvz/start/models/start-form.models';

import { File, Files } from '@pvz/core/models/file.model';
import { ProcessParameters } from '@pvz/core/models/process-parameters.model';
import { Algorithm, Allele, ApiMeta } from '@pvz/core/models/api-responses.model';
import { InputService } from '@pvz/core/services/inputs.service';

import * as fromInputsActions from '@pvz/start/actions/inputs.actions';
import * as fromAllelesActions from '@pvz/start/actions/alleles.actions';
import * as fromAlgorithmsActions from '@pvz/start/actions/algorithms.actions';
import * as fromStartActions from '@pvz/start/actions/start.actions';
import * as fromStart from '@pvz/start/reducers';
// TODO: move SetSubmittedValueAction to start/reducers/index to be included with fromStart
import { INITIAL_STATE } from '@pvz/start/reducers/start.reducer';

@Component({
  selector: 'pvz-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(NgSelectComponent) algorithmsSelect: NgSelectComponent;

  private subscriptions = [];

  inputs$: Observable<Files>;
  algorithms$: Observable<Array<Algorithm>>;

  alleles$: Observable<Array<Allele>>;
  alleles: Allele[] = []; // stores allele objects for alleles select
  concatAlleles: boolean = false;
  allelesTypeahead$ = new BehaviorSubject<string>('');
  allelesScroll$ = new Subject<any>();
  allelesScrollToEnd$ = new Subject<any>();
  allelesMeta$: Observable<ApiMeta>;
  allelesLoading$: Observable<boolean>;
  predictionAlgorithms$: Observable<Array<string>>;
  selectedAlgorithms$: Observable<Array<Algorithm>>;

  netChopMethodOptions: {};
  topScoreMetricOptions: {};
  epitopeLengths: string[];

  formState$: Observable<FormGroupState<StartFormGroupValue>>;
  formPost$: Observable<{}>;
  submittedValue$: Observable<StartFormGroupValue>;
  newProcessId$: Observable<number>;

  constructor(
    private store: Store<fromStart.State>,
  ) {
    this.formState$ = store.pipe(select(fromStart.getFormState), map(s => s.state));
    this.submittedValue$ = store.pipe(select(fromStart.getSubmittedValue),
      filter(v => v !== undefined && v !== null));

    // TODO do this grouping in the service or create a new selector in start.reducer
    this.inputs$ = store.pipe(select(fromStart.getAllInputs), map((inputs) => {
      let options = [];
      let dir = '~pVAC-Seq';

      function groupFiles(dir, contents) {
        contents.forEach((item) => {
          if (item.type === "file") {
            let option = {
              display_name: item.display_name,
              fileID: item.fileID,
              directory: dir
            }
            options.push(option);
          } else if (item.type === "directory") {
            dir = dir + '/' + item.display_name;
            groupFiles(dir, item.contents);
          }
        })
      }
      groupFiles(dir, inputs);
      return options;
    }));

    this.algorithms$ = store.pipe(select(fromStart.getAllAlgorithms));
    this.alleles$ = store.pipe(select(fromStart.getAllAlleles));
    this.allelesMeta$ = store.pipe(select(fromStart.getStartState), map(state => state.alleles.meta))
    this.allelesLoading$ = store.pipe(select(fromStart.getStartState), map(state => state.alleles.loading));
    this.formPost$ = store.pipe(select(fromStart.getStartState), map(state => state.post));
    this.newProcessId$ = store.pipe(select(fromStart.getStartState), map(state => state.post.processid));

    // TODO move to start.reducer
    const getPredictionAlgorithmsState = createSelector(
      fromStart.getFormState,
      form => form.state.value.prediction_algorithms
    );

    // concatAlleles flag, set by predictionAlgorithms$, allelesTypeahead$, and allelesScrollToEnd$ subscriptions
    // scrollToEnd required concat, others replacement of alleles array
    this.alleles$.subscribe((alleles) => {
      if (this.concatAlleles) {
        this.alleles = this.alleles.concat(alleles);
      } else {
        this.alleles = alleles;
      }
    });


    // observe form prediction algorithms value, filtering empty arrays
    // dispatch LoadAlleles when prediction_algorithms changes
    this.predictionAlgorithms$ = store.pipe(
      select(getPredictionAlgorithmsState),
      map(s => unbox(s)));

    this.subscriptions.push(
      this.predictionAlgorithms$.subscribe((algorithms) => {
        this.concatAlleles = false;
        if (algorithms.length > 0) {
          const req = {
            prediction_algorithms: algorithms.join(','),
            page: 1,
            count: dropdownPageCount
          }
          this.store.dispatch(new fromAllelesActions.LoadAlleles(req));
        } else {
          this.store.dispatch(new fromAllelesActions.ClearAlleles());
        }
      }));
    const dropdownPageCount = 50; // items loaded per alleles select page-load
    const loadPageOnScrollStart = 35; // query next page of results on scroll start > alleles.length - loadPageOnScrollStart

    // reload alleles when typeahead updates
    this.subscriptions.push(
      this.allelesTypeahead$.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        filter(term => term.length > 0),
        withLatestFrom(this.allelesMeta$, this.predictionAlgorithms$)
      ).subscribe(([term, meta, algorithms]) => {
        const req = {
          prediction_algorithms: algorithms,
          name_filter: term,
          page: 1,
          count: dropdownPageCount
        }
        this.concatAlleles = false;
        this.store.dispatch(new fromAllelesActions.LoadAlleles(req))
      }));

    // load next page of alleles when dropdown scrolls near the end
    this.subscriptions.push(
      Observable
        .merge(this.allelesScroll$, this.allelesScrollToEnd$)
        .pipe(
          throttleTime(100),
          withLatestFrom(this.allelesMeta$, this.predictionAlgorithms$, this.allelesTypeahead$)
        ).subscribe(([event, meta, algorithms, term]) => {
          console.log('-=-=-=-==-=-=-=-=-=-=-=-=-=- alleles scroll');
          console.log(event.start ? 'scroll event' : 'scrollToEnd event');
          const req = {
            prediction_algorithms: algorithms,
            name_filter: term,
            page: meta.page + 1,
            count: dropdownPageCount
          }
          if (req.page <= meta.total_pages && event.start > this.alleles.length - loadPageOnScrollStart) {
            this.concatAlleles = true;
            this.store.dispatch(new fromAllelesActions.LoadAlleles(req))
          }
        }));

    this.epitopeLengths = ['8', '9', '10', '11', '12', '13', '14'];

    this.netChopMethodOptions = [
      { label: 'Skip Netchop', value: '' },
      { label: 'C term 3.0', value: 'cterm' },
      { label: '20S 3.0', value: '20s' },
    ];

    this.topScoreMetricOptions = [
      { label: 'Median Score', value: 'median' },
      { label: 'Lowest Score', value: 'lowest' },
    ];
  }

  onSubmit() {
    this.subscriptions.push(
      this.formState$.pipe(
        take(1),
        map(fs => new fromStartActions.SetSubmittedValueAction(fs.value))).subscribe(this.store));
  }

  reset() {
    this.store.dispatch(new SetValueAction(INITIAL_STATE.id, INITIAL_STATE.value));
    this.store.dispatch(new ResetAction(INITIAL_STATE.id));
  }

  ngOnInit() {
    this.store.dispatch(new fromInputsActions.LoadInputs());
    this.store.dispatch(new fromAlgorithmsActions.LoadAlgorithms());
  }

  ngAfterViewInit() {
    console.log('start-page.component ngAfterViewInit:');
    console.log(this.algorithmsSelect);
    Promise.resolve(null).then(() => {
      this.algorithmsSelect.setDisabledState(true);
    });
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    this.reset();
  }
}
