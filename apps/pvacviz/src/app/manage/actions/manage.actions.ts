import { Action } from '@ngrx/store';
import { Process } from '../../core/models/process.model';

export enum ManageActionTypes {
  Load = '[Process] Load',
  LoadSuccess = '[Process] Load Success',
  LoadFail = '[Process] Load Fail',

  LoadDetail = '[Process] Load Detail',
  LoadDetailSuccess = '[Process] Load Detail Success',
  LoadDetailFail = '[Process] Load Detail Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Load implements Action {
  readonly type = ManageActionTypes.Load;

  constructor() { }
}

export class LoadSuccess implements Action {
  readonly type = ManageActionTypes.LoadSuccess;

  constructor(public payload: Process[]) { }
}

export class LoadFail implements Action {
  readonly type = ManageActionTypes.LoadFail;

  constructor(public payload: any) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ManageActions = Load | LoadSuccess | LoadFail;
