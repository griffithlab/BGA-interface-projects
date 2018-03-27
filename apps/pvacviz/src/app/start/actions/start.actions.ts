import { Action } from '@ngrx/store';
import { File, Files } from '../../core/models/file.model';

export enum StartActionTypes {
  LoadInputs = '[Start] Load Inputs',
  LoadInputsSuccess = '[Start] Load Inputs Success',
  LoadInputsFail = '[Start] Load Inputs Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadInputs implements Action {
  readonly type = StartActionTypes.LoadInputs;

  constructor() { }
}

export class LoadInputsSuccess implements Action {
  readonly type = StartActionTypes.LoadInputsSuccess;

  constructor(public payload: Files) { }
}

export class LoadInputsFail implements Action {
  readonly type = StartActionTypes.LoadInputsFail;

  constructor(public payload: any) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type StartActions = LoadInputs | LoadInputsSuccess | LoadInputsFail;
