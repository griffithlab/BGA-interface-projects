import { Action } from '@ngrx/store';

export enum ProcessesActionTypes {
  ProcessesAction = '[Processes] Action'
}

export class Processes implements Action {
  readonly type = ProcessesActionTypes.ProcessesAction;
}

export type ProcessesActions = Processes;
