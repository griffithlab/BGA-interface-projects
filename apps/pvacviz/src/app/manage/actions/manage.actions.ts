import { Action } from '@ngrx/store';
import { Process } from '../../core/models/process.model';

export enum ManageActionTypes {
  Load = '[Manage] Load Processes',
  LoadSuccess = '[Manage] Load Processes Success',
  LoadFail = '[Manage] Load Processes Fail',

  Remove = '[Manage] Remove Process',

  LoadDetail = '[Manage] Load Process Detail',
  LoadDetailSuccess = '[Manage] Load Process Detail Success',
  LoadDetailFail = '[Manage] Load Process Detail Fail',

  Archive = '[Manage] Archive Process',
  ArchiveSuccess = '[Manage] Archive Process Success',
  ArchiveFail = '[Manage] Archive Process Fail'
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

export class Remove implements Action {
  readonly type = ManageActionTypes.Remove;

  constructor(public payload: number) { }
}

export class LoadDetail implements Action {
  readonly type = ManageActionTypes.LoadDetail;

  constructor() { }
}

export class LoadDetailSuccess implements Action {
  readonly type = ManageActionTypes.LoadDetailSuccess;

  constructor(public payload: Process) { }
}

export class LoadDetailFail implements Action {
  readonly type = ManageActionTypes.LoadDetailFail;

  constructor(public payload: any) { }
}

export class Archive implements Action {
  readonly type = ManageActionTypes.Archive;

  constructor(public payload?: number) { }
}

export class ArchiveSuccess implements Action {
  readonly type = ManageActionTypes.ArchiveSuccess;

  constructor(public payload: { id: number, message: any }) { }
}

export class ArchiveFail implements Action {
  readonly type = ManageActionTypes.ArchiveFail;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ManageActions =
  Load | LoadSuccess | LoadFail | Remove
  | LoadDetail | LoadDetailSuccess | LoadDetailFail
  | Archive | ArchiveSuccess | ArchiveFail;
