import { Component, Input, forwardRef, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormsModule
} from "@angular/forms";

import { Observable } from 'rxjs/Rx';
import { map, filter, take, withLatestFrom } from 'rxjs/operators';

import { Store, select, createSelector } from '@ngrx/store';

import { FormGroupState, ResetAction, SetValueAction, unbox } from 'ngrx-forms';

import { StartFormGroupValue, StartFormGroupInitialState } from '@pvz/start/models/start.models';

import { File, Files } from '@pvz/core/models/file.model';
import { ProcessParameters } from '@pvz/core/models/process-parameters.model';
import { Algorithm, Allele } from '@pvz/core/models/api-responses.model';
import { InputService } from '@pvz/core/services/inputs.service';

import * as fromInputsActions from '@pvz/start/actions/inputs.actions';
import * as fromAllelesActions from '@pvz/start/actions/alleles.actions';
import * as fromAlgorithmsActions from '@pvz/start/actions/algorithms.actions';
import * as fromStartActions from '@pvz/start/actions/start.actions';
import * as fromStart from '@pvz/start/reducers';
// TODO: move SetSubmittedValueAction to start/reducers/index to be included with fromStart
import { SetSubmittedValueAction, INITIAL_STATE } from '@pvz/start/reducers/start.reducer';

@Component({
  selector: 'pvz-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  private subscriptions = [];
  formState$: Observable<FormGroupState<StartFormGroupValue>>;
  submittedValue$: Observable<StartFormGroupValue | undefined>;

  postSubmitting$: Observable<boolean>;
  postSubmitted$: Observable<boolean>;
  postMessage$: Observable<string>;
  postError$: Observable<boolean>;

  inputs$: Observable<Files>;
  algorithms$: Observable<Array<Algorithm>>;
  // TODO: figure out why Observable<Array<any>> below throws a type error
  alleles$: Observable<Array<any>>;
  newProcessId$: Observable<number>;

  netChopMethodOptions;
  topScoreMetricOptions;

  predictionAlgorithms$: Observable<Array<string>>;

  constructor(
    private store: Store<fromStart.State>,
  ) {
    this.formState$ = store.pipe(select(fromStart.getFormState), map(s => s.state));
    this.submittedValue$ = store.pipe(select(fromStart.getSubmittedValue),
      filter(v => v !== undefined && v !== null));


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

    this.alleles$ = store.pipe(select(fromStart.getAllAlleles))

    this.algorithms$ = store.pipe(select(fromStart.getAllAlgorithms));
    this.postSubmitting$ = store.pipe(select(fromStart.getStartState), map(state => state.post.submitting));
    this.postSubmitted$ = store.pipe(select(fromStart.getStartState), map(state => state.post.submitted));
    this.postMessage$ = store.pipe(select(fromStart.getStartState), map(state => state.post.message));
    this.postError$ = store.pipe(select(fromStart.getStartState), map(state => state.post.error));
    this.newProcessId$ = store.pipe(select(fromStart.getStartState), map(state => state.post.processid));

    this.netChopMethodOptions = [
      { label: 'Skip Netchop', value: '' },
      { label: 'C term 3.0', value: 'cterm' },
      { label: '20S 3.0', value: '20s' },
    ];

    this.topScoreMetricOptions = [
      { label: 'Median Score', value: 'median' },
      { label: 'Lowest Score', value: 'lowest' },
    ];

    const getPredictedAlgorithmsState = createSelector(
      fromStart.getFormState,
      form => form.state.value.prediction_algorithms
    );

    // observe form prediction algorithms value, filtering empty arrays
    this.predictionAlgorithms$ = store.pipe(
      select(getPredictedAlgorithmsState),
      map(s => unbox(s)));

    // load new allele set when algorithms updated
    this.subscriptions.push(
      this.predictionAlgorithms$.subscribe((algorithms) => {
        if (algorithms.length > 0) {
          this.store.dispatch(new fromAllelesActions.LoadAlleles(algorithms));
        }
      }));

    // fire off submit action when submitValue is updated
    const onSubmitted$ = this.submittedValue$.pipe(withLatestFrom(this.formState$));
    this.subscriptions.push(onSubmitted$);

    onSubmitted$.subscribe(([formValue, formState]) => {
      const processParameters: ProcessParameters = parseFormParameters(unbox(formValue))
      console.log('new processParameters -=-=-=-=-=-');
      console.log(processParameters);
      this.store.dispatch(new fromStartActions.StartProcess(processParameters));
    });

    function parseFormParameters(formParameters) {
      formParameters.alleles = formParameters.alleles.join(',')
      formParameters.prediction_algorithms = formParameters.prediction_algorithms.join(',')
      formParameters.epitope_lengths = formParameters.epitope_lengths.join(',')
      // TODO figure out where input is cast to Number before submitting - shouldn't have to cast it here
      formParameters.input = formParameters.input.toString();
      return formParameters as ProcessParameters;
    }
  }

  ngOnInit() {
    this.store.dispatch(new fromInputsActions.LoadInputs());
    this.store.dispatch(new fromAlgorithmsActions.LoadAlgorithms());
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
  // onSubmit(startParameters): void {
  //   this.store.dispatch(new fromStartActions.StartProcess(startParameters));
  // }

  onDestroy() {
    // unsubscribe from all manual subscriptions
    if (this.subscriptions.length > 0) { this.subscriptions.forEach(sub => sub.unsubscribe()); }
  }
}
