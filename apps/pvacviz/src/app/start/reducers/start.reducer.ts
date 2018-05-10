import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { File, Files } from '../../core/models/file.model';
import { StartActions, StartActionTypes, StartProcessSuccess } from '../actions/start.actions';
import { ApiStartResponse } from '../../core/models/api-responses.model';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is then extended to include
 * any additional interface properties.
 */
// TODO maybe just move this into the parent interface instead of extending?
export interface State extends ApiStartResponse {
  submitting: boolean;
  submitted: boolean;
  error: boolean;
  errorMessage?: string;
}

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = {
  submitting: false,
  submitted: false,
  code: null,
  message: null,
  processid: null,
  error: false,
  errorMessage: null
};

export function reducer(state = initialState, action: StartActions): State {
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
