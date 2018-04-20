import { Action } from '@ngrx/store';
import { File, Files } from '../../core/models/file.model';
import { ProcessParameters } from '../../core/models/process-parameters.model';
import { ApiStartResponse } from '../../core/models/api-responses.model';
export enum StartActionTypes {
  LoadInputs = '[Start] Load Inputs',
  LoadInputsSuccess = '[Start] Load Inputs Success',
  LoadInputsFail = '[Start] Load Inputs Fail',

  StartProcess = '[Start] Start Process',
  StartProcessSuccess = '[Start] Start Process Success',
  StartProcessFail = '[Start] Start Process Fail'
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

export class StartProcess implements Action {
  readonly type = StartActionTypes.StartProcess;

  constructor(public payload: ProcessParameters) { }
}

export class StartProcessSuccess implements Action {
  readonly type = StartActionTypes.StartProcessSuccess;

  constructor(public payload: ApiStartResponse) { }
}

export class StartProcessFail implements Action {
  readonly type = StartActionTypes.StartProcessFail;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type StartActions =
  LoadInputs
  | LoadInputsSuccess
  | LoadInputsFail
  | StartProcess
  | StartProcessSuccess
  | StartProcessFail;
