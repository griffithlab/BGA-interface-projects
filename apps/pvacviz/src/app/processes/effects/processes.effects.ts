import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ProcessesActions, ProcessesActionTypes } from '../actions/processes.actions';

@Injectable()
export class ProcessesEffects {

  @Effect()
  effect$ = this.actions$.ofType(ProcessesActionTypes.ProcessesAction);

  constructor(private actions$: Actions) {}
}
