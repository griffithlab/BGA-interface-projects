import { Component, Input, forwardRef, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";


import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import { FormGroupState, ResetAction, SetValueAction } from 'ngrx-forms';

import { StartFormGroupValue, StartFormGroupInitialState } from '@pvz/start/models/start.models';

import { File, Files } from '@pvz/core/models/file.model';
import { Algorithm } from '@pvz/core/models/api-responses.model';
import { InputService } from '@pvz/core/services/inputs.service';

import * as fromInputsActions from '@pvz/start/actions/inputs.actions';
import * as fromAlgorithmsActions from '@pvz/start/actions/algorithms.actions';
import * as fromStartActions from '@pvz/start/actions/start.actions';
import * as fromStart from '@pvz/start/reducers';

@Component({
  selector: 'pvz-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  formState$: Observable<FormGroupState<StartFormGroupValue>>;
  submittedValue$: Observable<StartFormGroupValue | undefined>;

  inputs$: Observable<Files>;
  algorithms$: Observable<Array<Algorithm>>;
  postSubmitting$: Observable<boolean>;
  postSubmitted$: Observable<boolean>;
  postMessage$: Observable<string>;
  postError$: Observable<boolean>;
  newProcessId$: Observable<number>;

  netChopMethodOptions;
  topScoreMetricOptions;
  startForm: FormGroup;

  constructor(
    private store: Store<fromStart.State>,
    private fb: FormBuilder
  ) {
    // TODO: refactor start.reducer & reducers index to eliminate clumsy form state references
    this.formState$ = store.pipe(select(fromStart.getFormState), map(s => s.state));
    this.submittedValue$ = store.pipe(select(fromStart.getStartState), map(state => state.form.submittedValue));

    this.inputs$ = store.pipe(select(fromStart.getAllInputs));
    this.algorithms$ = store.pipe(select(fromStart.getAllAlgorithms));
    this.postSubmitting$ = store.pipe(select(fromStart.getStartState), map(state => state.post.submitting));
    this.postSubmitted$ = store.pipe(select(fromStart.getStartState), map(state => state.post.submitted));
    this.postMessage$ = store.pipe(select(fromStart.getStartState), map(state => state.post.message));
    this.postError$ = store.pipe(select(fromStart.getStartState), map(state => state.post.error));
    this.newProcessId$ = store.pipe(select(fromStart.getStartState), map(state => state.post.processid));

    this.netChopMethodOptions = [
      { label: 'C term 3.0', value: 'cterm' },
      { label: '20S 3.0', value: '20s' },
    ];

    this.topScoreMetricOptions = [
      { label: 'Median Score', value: 'median' },
      { label: 'Lowest Score', value: 'lowest' },
    ];

    const startFormGroup = {
      'input': [null, [Validators.required]],
      'samplename': ['sample-name-N', [Validators.required]],
      'alleles': ['HLA-A*01:01,HLA-A*03:01,HLA-B*07:02,HLA-B*08:01,HLA-C*07:02,HLA-C*07:137', [Validators.required]],
      'prediction_algorithms': [[], [Validators.required]],
      'epitope_lengths': ['10', [Validators.required]],
      'peptide_sequence_length': [21, [Validators.required]],
      'net_chop_method': ['', []],
      'net_chop_threshold': [0.5, []],
      'netmhc_stab': [false, []],
      'top_score_metric': ['median', []],
      'binding_threshold': [500, []],
      'allele_specific_cutoffs': [false, []],
      'minimum_fold_change': [0, []],
      'expn_val': [1, []],
      'normal_cov': [5, []],
      'tdna_cov': [5, []],
      'trna_cov': [5, []],
      'normal_vaf': [5, []],
      'tdna_vaf': [5, []],
      'trna_vaf': [5, []],
      'fasta_size': [200, []],
      'iedb_retries': [5, []],
      'downstream_sequence_length': [1000, []],
      'iedb_install_dir': ['', []],
      'keep_tmp_files': [false, []],
      'force': [false, []],
    };

    this.startForm = fb.group(startFormGroup);
  }

  ngOnInit() {
    this.store.dispatch(new fromInputsActions.LoadInputs());
    this.store.dispatch(new fromAlgorithmsActions.LoadAlgorithms());
  }

  onSubmit(startParameters): void {
    this.store.dispatch(new fromStartActions.StartProcess(startParameters));
  }
}
