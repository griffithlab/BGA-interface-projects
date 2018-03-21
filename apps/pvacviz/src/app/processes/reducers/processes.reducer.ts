import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Process } from '../models/process.model';
import { ProcessActions, ProcessActionTypes } from '../actions/process.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: ProcessActions): State {
  switch (action.type) {

    case ProcessActionTypes.Load:
      return state;


    default:
      return state;
  }
}
