import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { File, Files } from '../../core/models/file.model';
import { StartActions, StartActionTypes, StartProcessSuccess } from '../actions/start.actions';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is then extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<File> {
  loading: boolean;
  loaded: boolean;
  error: string;
}

/**
 * createEntityAdapter creates many an object of helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<File> = createEntityAdapter<File>({
  selectId: (file: File) => file.fileID,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: ''
});

export function reducer(state = initialState, action: StartActions): State {
  switch (action.type) {

    case StartActionTypes.LoadInputs:
      return {
        ...state,
        loading: true,
      };

    case StartActionTypes.LoadInputsSuccess:
      return {
        /**
         * The addMany function provided by the created adapter
         * adds many records to the entity dictionary
         * and returns a new state including those records. If
         * the collection is to be sorted, the adapter will
         * sort each record upon entry into the sorted array.
         */
        ...adapter.addMany(action.payload, state),
        loading: false,
        loaded: true
      };

    case StartActionTypes.LoadInputsFail:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      }

    case StartActionTypes.StartProcess:
      return {
        ...state,
        loading: true,
      }

    case StartActionTypes.StartProcessSuccess:
      return {
        ...state,
        loading: false,
        loaded: true
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
