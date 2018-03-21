import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ProcessActions, ProcessActionTypes } from '../actions/process.actions';

@Injectable()
export class ProcessEffects {

  @Effect()
  effect$ = this.actions$.ofType(ProcessActionTypes.Load);

  constructor(private actions$: Actions) { }
}
