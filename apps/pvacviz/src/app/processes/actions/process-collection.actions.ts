import { Action } from '@ngrx/store';
import { Process } from '../models/process.model';

export enum ProcessCollectionActionTypes {
  Load = '[Process Collection] Load',
  LoadSuccess = '[Process Collection] Load Success',
  LoadFail = '[Process Collection] Load Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = ProcessCollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProcessCollectionActionTypes.LoadSuccess;

  constructor(public payload: Process[]) { }
}

export class LoadFail implements Action {
  readonly type = ProcessCollectionActionTypes.LoadFail;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProcessCollectionActions = Load
  | LoadSuccess
  | LoadFail;
