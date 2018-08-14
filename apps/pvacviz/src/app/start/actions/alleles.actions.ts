import { Action } from '@ngrx/store';
import { ProcessParameters } from '@pvz/core/models/process-parameters.model';
import { ApiStartResponse } from '@pvz/core/models/api-responses.model';
import { Algorithm } from '@pvz/core/models/api-responses.model';
export enum AllelesActionTypes {
  LoadAlleles = '[Start] Load Alleles',
  LoadAllelesSuccess = '[Start] Load Alleles Success',
  LoadAllelesFail = '[Start] Load Alleles Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadAlleles implements Action {
  readonly type = AllelesActionTypes.LoadAlleles;

  constructor(public payload?: string[]) { }
}

export class LoadAllelesSuccess implements Action {
  readonly type = AllelesActionTypes.LoadAllelesSuccess;

  constructor(public payload: Array<Algorithm>) { }
}

export class LoadAllelesFail implements Action {
  readonly type = AllelesActionTypes.LoadAllelesFail;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AllelesActions =
  LoadAlleles
  | LoadAllelesSuccess
  | LoadAllelesFail;
