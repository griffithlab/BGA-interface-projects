import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromInputs from './inputs.reducer';
import * as fromStart from './start.reducer';
import * as fromRoot from '../../reducers';

export interface StartState {
  inputs: fromInputs.State;
  post: fromStart.State;
}

export interface State extends fromRoot.State {
  start: StartState;
}

export const reducers = {
  inputs: fromInputs.reducer,
  post: fromStart.reducer
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

export const getStartState = createFeatureSelector<StartState>('start');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */

export const getInputsState = createSelector(
  getStartState,
  state => state.inputs
);

export const getPostState = createSelector(
  getStartState,
  state => state.post
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */

export const {
  selectEntities: getInputs,
  selectAll: getAllInputs,
} = fromInputs.adapter.getSelectors(getInputsState);
