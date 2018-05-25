import { Action } from '@ngrx/store';
import { Process } from '../models/process.model';

export enum ProcessActionTypes {
  Load = '[Processes] Load Processes',
  LoadSuccess = '[Processes] Load Processes Success',
  LoadFail = '[Processes] Load Processes Fail',

  Remove = '[Processes] Remove Process',

  LoadDetail = '[Processes] Load Process Detail',
  LoadDetailSuccess = '[Processes] Load Process Detail Success',
  LoadDetailFail = '[Processes] Load Process Detail Fail',

  Archive = '[Processes] Archive Process',
  ArchiveSuccess = '[Processes] Archive Process Success',
  ArchiveFail = '[Processes] Archive Process Fail',

  Restart = '[Processes] Restart Process',
  RestartSuccess = '[Processes] Restart Process Success',
  RestartFail = '[Processes] Restart Process Fail',

  Stop = '[Processes] Stop Process',
  StopSuccess = '[Processes] Stop Success',
  StopFail = '[Processes] Stop Fail'
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

  constructor() { }
}

export class LoadSuccess implements Action {
  readonly type = ProcessActionTypes.LoadSuccess;

  constructor(public payload: Process[]) { }
}

export class LoadFail implements Action {
  readonly type = ProcessActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export class Remove implements Action {
  readonly type = ProcessActionTypes.Remove;

  constructor(public payload: number) { }
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

export class Stop implements Action {
  readonly type = ProcessActionTypes.Stop;

  constructor(public payload?: number) { }
}

export class StopSuccess implements Action {
  readonly type = ProcessActionTypes.StopSuccess;

  constructor(public payload: { id: number, message: any }) { }
}

export class StopFail implements Action {
  readonly type = ProcessActionTypes.StopFail;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProcessActions =
  Load | LoadSuccess | LoadFail | Remove
  | LoadDetail | LoadDetailSuccess | LoadDetailFail
  | Archive | ArchiveSuccess | ArchiveFail
  | Restart | RestartSuccess | RestartFail
  | Stop | StopSuccess | StopFail;
