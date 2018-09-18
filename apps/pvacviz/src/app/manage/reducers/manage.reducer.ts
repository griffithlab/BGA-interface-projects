import { createSelector } from '@ngrx/store';

import 'rxjs/add/observable/of';

import { Process } from '@pvz/core/models/process.model';
import { ManageActions, ManageActionTypes } from '@pvz/manage/actions/manage.actions';
import { ProcessActions, ProcessActionTypes } from '@pvz/core/actions/process.actions';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is then extended to include
 * any additional interface properties.
 */
export interface State {
  showNotice: boolean;
  notice: {
    message: string;
    type: string;
  }
}

export const initialState = {
  showNotice: false,
  notice: {
    message: undefined,
    type: undefined
  }
};

export function reducer(state = initialState,
  action: ProcessActions | ManageActions): State {
  switch (action.type) {

    case ProcessActionTypes.ArchiveSuccess:
      return {
        showNotice: true,
        notice: {
          message: `Process #${action.payload.id} archived.`,
          type: 'info'
        }
      };

    default:
      return state;
  }
}
