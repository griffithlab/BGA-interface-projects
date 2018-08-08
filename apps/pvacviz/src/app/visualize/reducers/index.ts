import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromNgrxRouter from '@ngrx/router-store';

import * as fromRoot from '@pvz/reducers';
import { RouterStateUrl } from '@pvz/core/models/router.model';

export interface State extends fromRoot.State {
  visualize: {};
}

export const getRouterState = createFeatureSelector<fromNgrxRouter.RouterReducerState<RouterStateUrl>>('router');

export const getRouteProcessId = createSelector(
  getRouterState,
  router => router.state.params.processId
)

export const getRouteFileId = createSelector(
  getRouterState,
  router => router.state.params.fileId
)
