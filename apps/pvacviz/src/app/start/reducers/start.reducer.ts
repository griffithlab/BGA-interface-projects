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
export interface State extends ApiStartResponse {
  loading: boolean;
  loaded: boolean;
  error?: string;
}

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = {
  loading: false,
  loaded: false,
  code: null,
  message: null,
  processid: null,
  error: null
};

export function reducer(state = initialState, action: StartActions): State {
  switch (action.type) {

    case StartActionTypes.StartProcess:
      return {
        ...state,
        loading: true,
      }

    case StartActionTypes.StartProcessSuccess:
      return {
        ...state,
        loading: false,
        loaded: true,
        code: action.payload.code,
        message: action.payload.message,
        processid: action.payload.processid
      }

    case StartActionTypes.StartProcessFail:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      }

    default:
      return state;
  }
}
