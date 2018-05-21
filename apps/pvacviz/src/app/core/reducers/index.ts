import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromLayout from './layout.reducer';

export interface CoreState {
  layout: fromLayout.State;
}

export interface State extends fromRoot.State {
  core: CoreState;
}

export const reducers = {
  layout: fromLayout.reducer
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `processes` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.processeState$ = state$.pipe(select(getProcesseState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getLayoutState = createFeatureSelector<CoreState>('layout');
