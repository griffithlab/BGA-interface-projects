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
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { Process } from '../../core/models/process.model';
import { ProcessService } from '../../core/services/process.service';
import {
  ManageActionTypes,
  ManageActions,
  Load,
  LoadSuccess,
  LoadFail,
  LoadDetail,
  LoadDetailSuccess,
  LoadDetailFail,
  Archive,
  ArchiveSuccess,
  ArchiveFail
} from '../actions/manage.actions';

import * as fromRoot from '../../reducers';
import { Store, select } from '@ngrx/store';
import { getRouterState } from '../reducers';

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
    private store: Store<fromRoot.State>
  ) { }

  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(ManageActionTypes.Load),
    switchMap(query => {
      return this.processes
        .query()
        .pipe(
          map((processes: Process[]) => new LoadSuccess(processes)),
          catchError(err => of(new LoadFail(err)))
        );
    })
  );

  @Effect()
  get$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDetail>(ManageActionTypes.LoadDetail),
    withLatestFrom(
      this.store.select(getRouterState),
      (action, router) => {
        return router.state.params.processId
      }
    ),
    switchMap(processId => {
      return this.processes
        .get(processId)
        .pipe(
          map((process: Process) => {
            return new LoadDetailSuccess(process)
          }),
          catchError(err => of(new LoadDetailFail(err)))
        )
    })
  )

  @Effect()
  archive$: Observable<Action> = this.actions$.pipe(
    ofType<Archive>(ManageActionTypes.Archive),
    withLatestFrom(
      this.store.select(getRouterState),
      (action, router) => {
        return router.state.params.processId
      }
    ),
    switchMap(processId => {
      return this.processes
        .archive(processId)
        .pipe(
          map((message: string) => {
            return new ArchiveSuccess(message)
          }),
          catchError(err => of(new ArchiveFail(err)))
        )
    })
  )
}
