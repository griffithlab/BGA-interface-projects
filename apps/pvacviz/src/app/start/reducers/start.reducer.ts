import { createSelector, combineReducers, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFormGroupState, formGroupReducer, FormGroupState } from 'ngrx-forms';

import { File, Files } from '@pvz/core/models/file.model';
import { StartFormGroup, StartFormGroupInitialState } from '@pvz/start/models/start.models';
import { StartActions, StartActionTypes, StartProcessSuccess } from '@pvz/start/actions/start.actions';
import { ApiStartResponse } from '@pvz/core/models/api-responses.model';

/**
 * FORM STATE AND REDUCER
 * Stores the form data itself
 **/
export interface FormState {
  startForm: {
    formState: FormGroupState<StartFormGroup>;
    submittedValue: StartFormGroup | undefined;
  }
}

export class SetSubmittedValueAction implements Action {
  static readonly TYPE = 'startForm/SET_SUBMITTED_VALUE';
  readonly type = SetSubmittedValueAction.TYPE;
  constructor(public submittedValue: StartFormGroup) { }
}

export const FORM_ID = 'startForm';

export const INITIAL_STATE = createFormGroupState<StartFormGroup>(FORM_ID, StartFormGroupInitialState);

const formReducers = combineReducers<FormState['startForm'], any>({
  formState(s = INITIAL_STATE, a: Action) {
    return formGroupReducer(s, a);
  },
  submittedValue(s: StartFormGroup | undefined, a: SetSubmittedValueAction) {
    switch (a.type) {
      case SetSubmittedValueAction.TYPE:
        return a.submittedValue;

      default:
        return s;
    }
  },
});

// need to export this function instead of the formReducers b/c of
// AOT issues w/ combineReducers
export function formReducer(s: FormState['startForm'], a: Action) {
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
