import { Action } from '@ngrx/store';
import { ProcessParameters } from '../../core/models/process-parameters.model';
import { ApiStartResponse } from '../../core/models/api-responses.model';
export enum AlgorithmsActionTypes {
  LoadAlgorithms = '[Start] Load Algorithms',
  LoadAlgorithmsSuccess = '[Start] Load Algorithms Success',
  LoadAlgorithmsFail = '[Start] Load Algorithms Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadAlgorithms implements Action {
  readonly type = AlgorithmsActionTypes.LoadAlgorithms;

  constructor() { }
}

export class LoadAlgorithmsSuccess implements Action {
  readonly type = AlgorithmsActionTypes.LoadAlgorithmsSuccess;

  constructor(public payload: Array<string>) { }
}

export class LoadAlgorithmsFail implements Action {
  readonly type = AlgorithmsActionTypes.LoadAlgorithmsFail;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AlgorithmsActions =
  LoadAlgorithms
  | LoadAlgorithmsSuccess
  | LoadAlgorithmsFail;
