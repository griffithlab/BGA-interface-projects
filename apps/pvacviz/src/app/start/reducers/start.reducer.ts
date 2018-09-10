import { createSelector, combineReducers, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  createFormGroupState,
  createFormStateReducerWithUpdate,
  formGroupReducer,
  FormGroupState,
  Boxed,
  box,
  unbox,
  validate,
  updateGroup,
  compose,
  updateArray
} from 'ngrx-forms';
import { required, minLength, lessThanOrEqualTo, greaterThan } from 'ngrx-forms/validation';

import { File, Files } from '@pvz/core/models/file.model';
import { Allele } from '@pvz/core/models/api-responses.model';
import { StartActions, StartActionTypes, StartProcessSuccess, SetSubmittedValueAction } from '@pvz/start/actions/start.actions';
import { ApiStartResponse } from '@pvz/core/models/api-responses.model';

export interface StartFormGroupValue {
  'input': string;
  'phased_proximal_variants_vcf': string,
  'samplename': string;
  'alleles': Boxed<string[]>;
  'prediction_algorithms': Boxed<string[]>;
  'epitope_lengths': Boxed<string[]>;
  'peptide_sequence_length': number;
  'net_chop_method': string;
  'net_chop_threshold': number;
  'netmhc_stab': boolean;
  'pass_only': boolean;
  'top_score_metric': string;
  'binding_threshold': number;
  'allele_specific_cutoffs': boolean;
  'minimum_fold_change': number;
  'expn_val': number;
  'normal_cov': number;
  'tdna_cov': number;
  'trna_cov': number;
  'normal_vaf': number;
  'tdna_vaf': number;
  'trna_vaf': number;
  'fasta_size': number;
  'iedb_retries': number;
  'downstream_sequence_length': number;
  'iedb_install_dir': string;
  'keep_tmp_files': boolean;
  'force': boolean;
}
export const StartFormGroupInitialState = {
  'input': null,
  'phased_proximal_variants_vcf': null,
  'samplename': '',
  'alleles': box([]),
  'prediction_algorithms': box([]),
  'epitope_lengths': box(['10']),
  'peptide_sequence_length': 21,
  'net_chop_method': '',
  'net_chop_threshold': 0.5,
  'netmhc_stab': false,
  'pass_only': false,
  'top_score_metric': 'median',
  'binding_threshold': 500,
  'allele_specific_cutoffs': false,
  'minimum_fold_change': 0,
  'expn_val': 1,
  'normal_cov': 5,
  'tdna_cov': 5,
  'trna_cov': 5,
  'normal_vaf': 5,
  'tdna_vaf': 5,
  'trna_vaf': 5,
  'fasta_size': 200,
  'iedb_retries': 5,
  'downstream_sequence_length': 1000,
  'iedb_install_dir': '',
  'keep_tmp_files': false,
  'force': false,
}
// TODO keep checking for v3.1.0, which adds transparent validation for boxed values:
// https://github.com/MrWolfZ/ngrx-forms/issues/96
export const validateAndUpdateFormState = updateGroup<StartFormGroupValue>({
  input: validate(required),
  phased_proximal_variants_vcf: validate(required),
  samplename: validate((value) => {
    return required(value);
  }, minLength(2)),
  prediction_algorithms: validate((value) => {
    return required(unbox(value));
  }, (value) => {
    return minLength(1)(unbox(value))
  }),
  alleles: validate(value => required(unbox(value)), value => minLength(1)(unbox(value))),
  epitope_lengths: validate(value => required(unbox(value)), value => minLength(1)(unbox(value))),
  peptide_sequence_length: validate(required),
  net_chop_threshold: validate(required),
  top_score_metric: validate(required),
  binding_threshold: validate(required),
  minimum_fold_change: validate(required),
  expn_val: validate(required),
  normal_cov: validate(required),
  tdna_cov: validate(required),
  trna_cov: validate(required),
  normal_vaf: validate(required),
  tdna_vaf: validate(required),
  trna_vaf: validate(required),
  fasta_size: validate(required),
  iedb_retries: validate(required, lessThanOrEqualTo(100), greaterThan(0)),
  downstream_sequence_length: validate(required),
});

export const FORM_ID = 'startForm';
export const INITIAL_STATE = validateAndUpdateFormState(createFormGroupState<StartFormGroupValue>(FORM_ID, StartFormGroupInitialState));

// validation
export const updateStartFormGroup = createFormStateReducerWithUpdate<StartFormGroupValue>(validateAndUpdateFormState);

/**
 * FORM STATE AND REDUCER
 * Stores the form data itself
 **/
export interface FormState {
  state: FormGroupState<StartFormGroupValue>;
  submittedValue: StartFormGroupValue | undefined;
}


const formReducers = combineReducers<FormState, any>({
  state(s = INITIAL_STATE, a: Action) {
    return updateStartFormGroup(s, a);
  },
  submittedValue(s: StartFormGroupValue | undefined, a: SetSubmittedValueAction) {
    switch (a.type) {
      case SetSubmittedValueAction.TYPE:
        return a.submittedValue;

      default:
        return s;
    }
  },
});

export function formReducer(s: FormState, a: Action) {
  return formReducers(s, a);
}

/**
 * FORM POST STATE AND REDUCER
 * Stores info related to submitting the start form, errors, etc.
 **/
export interface PostState extends ApiStartResponse {
  submitting: boolean;
  submitted: boolean;
  error: boolean;
}

// set initial form post state
export const initialState: PostState = {
  submitting: false,
  submitted: false,
  status: null,
  message: null,
  processid: null,
  error: false,
};

// form post reducers
export function postReducer(state = initialState, action: StartActions): PostState {
  switch (action.type) {

    case StartActionTypes.StartProcess:
      return {
        ...state,
        submitting: true,
      }

    case StartActionTypes.StartProcessSuccess:
      return {
        ...state,
        submitting: false,
        submitted: true,
        status: action.payload.status,
        message: action.payload.message,
        processid: action.payload.processid
      }

    case StartActionTypes.StartProcessFail:
      return {
        ...state,
        submitting: false,
        submitted: true,
        error: true,
        status: action.payload.status,
        message: action.payload.message
      }

    default:
      return state;
  }
}
