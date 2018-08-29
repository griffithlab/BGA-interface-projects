import { Component, Input, forwardRef, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { map, filter, take, startWith, withLatestFrom, debounceTime, tap, switchMap, distinctUntilChanged } from 'rxjs/operators';

import { Store, select, createSelector } from '@ngrx/store';

import { FormGroupState, ResetAction, SetValueAction, FormControlState, unbox } from 'ngrx-forms';

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
import { SetSubmittedValueAction, INITIAL_STATE } from '@pvz/start/reducers/start.reducer';
import { combineLatest } from '../../../../../../../node_modules/rxjs';

@Component({
  selector: 'pvz-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit, OnDestroy {
  private subscriptions = [];

  inputs$: Observable<Files>;
  algorithms$: Observable<Array<Algorithm>>;

  alleles$: Observable<Array<Allele>>;
  alleles: Allele[] = []; // stores allele objects for alleles select
  concatAlleles: boolean = false;
  allelesTypeahead$ = new BehaviorSubject<string>('');
  allelesScrollToEnd$ = new Subject<any>();
  allelesScroll$ = new Subject<any>();
  allelesMeta$: Observable<ApiMeta>;

  predictionAlgorithms$: Observable<Array<string>>;
  selectedAlgorithms$: Observable<Array<Algorithm>>;

  netChopMethodOptions;
  topScoreMetricOptions;

  formState$: Observable<FormGroupState<StartFormGroupValue>>;
  formPost$: Observable<{}>;
  submittedValue$: Observable<StartFormGroupValue>;
  newProcessId$: Observable<number>;


  postSubmitting$: Observable<boolean>;
  postSubmitted$: Observable<boolean>;
  postMessage$: Observable<string>;
  postError$: Observable<boolean>;

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

    // TODO: create only one observer for post, access attributes in template, this looks awful
    this.formPost$ = store.pipe(select(fromStart.getStartState), map(state => state.post));


    this.postSubmitting$ = store.pipe(select(fromStart.getStartState), map(state => state.post.submitting));
    this.postSubmitted$ = store.pipe(select(fromStart.getStartState), map(state => state.post.submitted));
    this.postMessage$ = store.pipe(select(fromStart.getStartState), map(state => state.post.message));
    this.postError$ = store.pipe(select(fromStart.getStartState), map(state => state.post.error));
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
          this.concatAlleles = false;
          this.store.dispatch(new fromAllelesActions.LoadAlleles(req));
        } else {
          this.store.dispatch(new fromAllelesActions.ClearAlleles());
        }
      }));
    const dropdownPageCount = 50;
    const loadPageOnScrollStart = 35;

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

    // load next page of alleles when dropdown scrolls to end
    this.subscriptions.push(
      this.allelesScrollToEnd$.pipe(
        withLatestFrom(this.allelesMeta$, this.predictionAlgorithms$, this.allelesTypeahead$)
      ).subscribe(([event, meta, algorithms, term]) => {
        const req = {
          prediction_algorithms: algorithms,
          name_filter: term,
          page: meta.page + 1,
          count: dropdownPageCount
        }
        if (req.page <= meta.total_pages) {
          this.concatAlleles = true;
          this.store.dispatch(new fromAllelesActions.LoadAlleles(req))
        }
      }));

    // load next page of alleles when dropdown scrolls near the end
    this.subscriptions.push(
      this.allelesScroll$.pipe(
        withLatestFrom(this.allelesMeta$, this.predictionAlgorithms$, this.allelesTypeahead$)
      ).subscribe(([event, meta, algorithms, term]) => {
        const req = {
          prediction_algorithms: algorithms,
          name_filter: term,
          page: meta.page + 1,
          count: dropdownPageCount
        }
        if (req.page <= meta.total_pages && event.start > this.alleles.length - loadPageOnScrollStart) {
          console.log('-=-=-=-=-=-=-=- ng-select allelesScroll$ - loading new page');
          console.log(event);
          console.log(req);

          this.concatAlleles = true;
          this.store.dispatch(new fromAllelesActions.LoadAlleles(req))
        }
      }));

    // fire off submit action when submitValue is updated with unique value
    this.subscriptions.push(
      this.submittedValue$
        .subscribe((formValue) => {
          const processParameters: ProcessParameters = parseFormParameters(unbox(formValue))
          this.store.dispatch(new fromStartActions.StartProcess(processParameters));
        }));

    function parseFormParameters(formParameters) {
      formParameters.alleles = formParameters.alleles.join(',')
      formParameters.prediction_algorithms = formParameters.prediction_algorithms.join(',')
      formParameters.epitope_lengths = formParameters.epitope_lengths.join(',')
      // TODO figure out where input is cast to Number before submitting - shouldn't have to cast it here
      formParameters.input = formParameters.input.toString();
      return formParameters as ProcessParameters;
    }

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
        map(fs => new SetSubmittedValueAction(fs.value))).subscribe(this.store));
  }

  reset() {
    this.store.dispatch(new SetValueAction(INITIAL_STATE.id, INITIAL_STATE.value));
    this.store.dispatch(new ResetAction(INITIAL_STATE.id));
  }

  ngOnInit() {
    this.store.dispatch(new fromInputsActions.LoadInputs());
    this.store.dispatch(new fromAlgorithmsActions.LoadAlgorithms());
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      console.log(JSON.stringify(this.subscriptions));
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    this.reset();
  }
}
