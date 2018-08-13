import { createSelector, combineReducers, Action } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFormGroupState, formGroupReducer, FormGroupState } from 'ngrx-forms';

import { File, Files } from '@pvz/core/models/file.model';
import { StartFormGroupValue, StartFormGroupInitialState } from '@pvz/start/models/start.models';
import { StartActions, StartActionTypes, StartProcessSuccess } from '@pvz/start/actions/start.actions';
import { ApiStartResponse } from '@pvz/core/models/api-responses.model';

/**
 * FORM STATE AND REDUCER
 * Stores the form data itself
 **/
export interface FormState {
  state: FormGroupState<StartFormGroupValue>;
  submittedValue: StartFormGroupValue | undefined;
}

export class SetSubmittedValueAction implements Action {
  static readonly TYPE = 'startForm/SET_SUBMITTED_VALUE';
  readonly type = SetSubmittedValueAction.TYPE;
  constructor(public submittedValue: StartFormGroupValue) { }
}

export const FORM_ID = 'startForm';

export const INITIAL_STATE = createFormGroupState<StartFormGroupValue>(FORM_ID, StartFormGroupInitialState);

const formReducers = combineReducers<FormState, any>({
  state(s = INITIAL_STATE, a: Action) {
    return formGroupReducer(s, a);
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
