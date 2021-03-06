import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromManage from './manage.reducer';
import * as fromRoot from '@pvz/reducers';

export interface ManageState {
  ui: fromManage.State;
}

export interface State extends fromRoot.State {
  ui: ManageState;
}

export const reducers = {
  ui: fromManage.reducer
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getManageState = createFeatureSelector<ManageState>('manage');
