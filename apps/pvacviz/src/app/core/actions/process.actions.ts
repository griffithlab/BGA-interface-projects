import { Action } from '@ngrx/store';
import { Process } from '@pvz/core/models/process.model';
import { ApiProcessesResponse } from '@pvz/core/models/api-responses.model';

export enum ProcessActionTypes {
  Load = '[Processes] Load Processes',
  LoadSuccess = '[Processes] Load Processes Success',
  LoadFail = '[Processes] Load Processes Fail',

  LoadDetail = '[Processes] Load Process Detail',
  LoadDetailSuccess = '[Processes] Load Process Detail Success',
  LoadDetailFail = '[Processes] Load Process Detail Fail',

  Archive = '[Processes] Archive Process',
  ArchiveSuccess = '[Processes] Archive Process Success',
  ArchiveFail = '[Processes] Archive Process Fail',

  Export = '[Processes] Export Process',
  ExportSuccess = '[Processes] Export Process Success',
  ExportFail = '[Processes] Export Process Fail',

  Restart = '[Processes] Restart Process',
  RestartSuccess = '[Processes] Restart Process Success',
  RestartFail = '[Processes] Restart Process Fail',

  Delete = '[Processes] Delete Process',
  DeleteSuccess = '[Processes] Delete Process Success',
  DeleteFail = '[Processes] Delete Process Fail',

  Remove = '[Processes] Remove Process',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class Load implements Action {
  readonly type = ProcessActionTypes.Load;

  constructor(public payload: {}) { }
}

export class LoadSuccess implements Action {
  readonly type = ProcessActionTypes.LoadSuccess;

  constructor(public payload: ApiProcessesResponse) { }
}

export class LoadFail implements Action {
  readonly type = ProcessActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export class LoadDetail implements Action {
  readonly type = ProcessActionTypes.LoadDetail;

  constructor() { }
}

export class LoadDetailSuccess implements Action {
  readonly type = ProcessActionTypes.LoadDetailSuccess;

  constructor(public payload: Process) { }
}

export class LoadDetailFail implements Action {
  readonly type = ProcessActionTypes.LoadDetailFail;

  constructor(public payload: any) { }
}

export class Archive implements Action {
  readonly type = ProcessActionTypes.Archive;

  constructor(public payload?: number) { }
}

export class ArchiveSuccess implements Action {
  readonly type = ProcessActionTypes.ArchiveSuccess;

  constructor(public payload: { id: number, message: any }) { }
}

export class ArchiveFail implements Action {
  readonly type = ProcessActionTypes.ArchiveFail;

  constructor(public payload: any) { }
}

export class Restart implements Action {
  readonly type = ProcessActionTypes.Restart;

  constructor(public payload?: number) { }
}

export class RestartSuccess implements Action {
  readonly type = ProcessActionTypes.RestartSuccess;

  constructor(public payload: { id: number, message: any }) { }
}

export class RestartFail implements Action {
  readonly type = ProcessActionTypes.RestartFail;

  constructor(public payload: any) { }
}

export class Export implements Action {
  readonly type = ProcessActionTypes.Export;

  constructor(public payload?: number) { }
}

export class ExportSuccess implements Action {
  readonly type = ProcessActionTypes.ExportSuccess;

  constructor(public payload: { id: number, message: any }) { }
}

export class ExportFail implements Action {
  readonly type = ProcessActionTypes.ExportFail;

  constructor(public payload: any) { }
}
export class Delete implements Action {
  readonly type = ProcessActionTypes.Delete;

  constructor(public payload?: number) { }
}

export class DeleteSuccess implements Action {
  readonly type = ProcessActionTypes.DeleteSuccess;

  constructor(public payload: { id: number, message: any }) { }
}

export class DeleteFail implements Action {
  readonly type = ProcessActionTypes.DeleteFail;

  constructor(public payload: any) { }
}

// removes a process from the store
export class Remove implements Action {
  readonly type = ProcessActionTypes.Remove;

  constructor(public payload: number) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProcessActions =
  Load | LoadSuccess | LoadFail
  | LoadDetail | LoadDetailSuccess | LoadDetailFail
  | Archive | ArchiveSuccess | ArchiveFail
  | Restart | RestartSuccess | RestartFail
  | Export | ExportSuccess | ExportFail
  | Delete | DeleteSuccess | DeleteFail
  | Remove;
