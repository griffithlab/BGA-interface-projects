import { Action } from '@ngrx/store';
import { Process } from '@pvz/core/models/process.model';
import { ApiProcessesResponse } from '@pvz/core/models/api-responses.model';

export enum ManageActionTypes {
  GotoManagePage = '[Manage] Go To Manage Page',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class GotoManagePage implements Action {
  readonly type = ManageActionTypes.GotoManagePage;

  constructor() { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ManageActions = GotoManagePage;
