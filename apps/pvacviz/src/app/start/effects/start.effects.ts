import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { unbox } from 'ngrx-forms';

import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import {
  debounceTime,
  map,
  switchMap,
  skip,
  takeUntil,
  catchError,
} from 'rxjs/operators';

import { ProcessService } from '@pvz/core/services/process.service';
import {
  StartActionTypes,
  StartActions,
  StartProcess,
  StartProcessSuccess,
  StartProcessFail,
  SetSubmittedValueAction
} from '../actions/start.actions';
import { ApiStartResponse } from '@pvz/core/models/api-responses.model';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class StartEffects {
  constructor(
    private actions$: Actions,
    private processes: ProcessService
  ) { }

  @Effect()
  start$: Observable<Action> = this.actions$.pipe(
    ofType<StartProcess>(StartActionTypes.StartProcess),
    switchMap(action => {
      return this.processes
        .start(action.payload)
        .pipe(
          map((response: ApiStartResponse) => new StartProcessSuccess(response)),
          catchError(err => of(new StartProcessFail(err.error)))
        );
    })
  );

  @Effect()
  start2$: Observable<Action> = this.actions$.pipe(
    ofType<SetSubmittedValueAction>(SetSubmittedValueAction.TYPE),
    switchMap((action, index) => {
      console.log('start2$ value: ');
      console.log(action);
      const req = this.parseStageRequest(unbox(action.submittedValue))
      return this.processes
        .start(req)
        .pipe(
          map((response: ApiStartResponse) => new StartProcessSuccess(response)),
          catchError(err => of(new StartProcessFail(err.error)))
        );
    })
  );

  private parseStageRequest = function(req) {
    req.prediction_algorithms = req.prediction_algorithms.join(',');
    req.alleles = req.alleles.join(',');
    req.epitope_lengths = req.epitope_lengths.join(',');
    return req;
  }
}
