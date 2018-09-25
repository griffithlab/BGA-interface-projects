import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import {
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as layout from '@pvz/core/actions/layout.actions';
import * as processes from '@pvz/core/actions/process.actions';
import { ModalConfig } from '@pvz/core/models/layout.model';
import { ApiMeta } from '@pvz/core/models/api-responses.model';

import {
  ProcessActionTypes,
  ProcessActions,
  Load,
  LoadDetail,
  ArchiveSuccess,
  DeleteSuccess,
  StopSuccess,
  RestartSuccess,
} from '@pvz/core/actions/process.actions';

import {
  ManageActionTypes,
  GotoManagePage
} from '@pvz/manage/actions/manage.actions';

import * as fromCore from '@pvz/core/reducers';
import * as fromRoot from '@pvz/reducers';

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
export class ManageEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private router: Router
  ) { }

  @Effect()
  reloadPagedProcesses$: Observable<Action> = this.actions$.pipe(
    ofType<Action>(
      ProcessActionTypes.ArchiveSuccess,
      ProcessActionTypes.DeleteSuccess,
      ProcessActionTypes.StopSuccess,
      ProcessActionTypes.RestartSuccess),
    withLatestFrom(this.store.select(fromCore.getProcessesMeta), // not sure why this.processMeta$ doesn't work here
      (action, meta) => {
        return [action, meta];
      }),
    switchMap(([action, meta]: [Action, ApiMeta]) => {
      let page;
      if (action.constructor.name === 'DeleteSuccess' || action.constructor.name === 'ArchiveSuccess') {
        // ensure we haven't removed the last process entry on a page, thus requesting an empty response
        page = Math.ceil((meta.total_count - 1) / meta.count) >= meta.page ? meta.page : meta.page - 1;
      } else {
        page = meta.page;
      }
      const req = { page: page, count: meta.count };
      return of(new Load(req))
    })
  );

  @Effect()
  reloadSingleProcesses$: Observable<Action> = this.actions$.pipe(
    ofType<ArchiveSuccess | DeleteSuccess | StopSuccess | RestartSuccess>(
      ProcessActionTypes.ArchiveSuccess,
      ProcessActionTypes.DeleteSuccess,
      ProcessActionTypes.StopSuccess,
      ProcessActionTypes.RestartSuccess),
    withLatestFrom(
      this.store.select(fromRoot.getRouterState),
      (action, router) => {
        return [action, router.state.params]
      }
    ),
    switchMap(([action, params]) => {
      let o;
      if (params.processId) {
        if (Number(action.payload.id) === Number(params.processId)) { // on a process detail page, need to reload process
          if (action.constructor.name === 'StopSuccess' || action.constructor.name === 'RestartSuccess') {
            this.store.dispatch(new layout.CloseModal())
            o = of(new LoadDetail())
          } else { // we're on a process detail page of a process that has just been removed
            const config: ModalConfig = {
              message: `Requested process no longer exists. Return to Manage Processes page?`,
              labels: {
                title: 'Process Removed',
                buttons: {
                  confirm: 'OK',
                  cancel: 'No'
                }
              },
              actions: {
                confirm: () => {
                  this.router.navigate(['/manage']);
                  return new layout.CloseModal();
                },
                cancel: () => new layout.CloseModal()
              }
            }
            o = of(new layout.OpenModal(config));
          }
        }
      } else {
        o = Observable.of({ type: "NO_ACTION" }); // we're not on a process detail page, no need to reload or prompt
      }
      return o;
    })
  );

  @Effect()
  navigate$: Observable<Action> = this.actions$.pipe(
    ofType<GotoManagePage>(ManageActionTypes.GotoManagePage),
    switchMap(action => {
      return of(new GotoManagePage())
    })
  );
}
