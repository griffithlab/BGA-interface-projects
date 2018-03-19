import { Action } from '@ngrx/store';
import { ProcessesActions, ProcessesActionTypes } from '../actions/processes.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: ProcessesActions): State {
  switch (action.type) {

    case ProcessesActionTypes.ProcessesAction:
      return state;


    default:
      return state;
  }
}
