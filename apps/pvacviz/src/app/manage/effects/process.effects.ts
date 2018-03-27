import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

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

import { Process } from '../../core/models/process.model';
import { ProcessService } from '../../core/services/process.service';
import {
  ProcessActionTypes,
  ProcessActions,
  Load,
  LoadSuccess,
  LoadFail
} from '../actions/process.actions';

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
export class ProcessEffects {
  constructor(
    private actions$: Actions,
    private processes: ProcessService,
  ) { }

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(ProcessActionTypes.Load),
    switchMap(query => {
      return this.processes
        .query()
        .pipe(
          map((processes: Process[]) => new LoadSuccess(processes)),
          catchError(err => of(new LoadFail(err)))
        );
    })
  );

}
