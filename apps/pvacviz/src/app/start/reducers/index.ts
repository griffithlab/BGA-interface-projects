import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromAlgorithms from './algorithms.reducer';
import * as fromAlleles from './alleles.reducer';
import * as fromInputs from './inputs.reducer';
import * as fromStart from './start.reducer';
import * as fromRoot from '@pvz/reducers';

export interface StartState {
  inputs: fromInputs.State;
  algorithms: fromAlgorithms.State;
  alleles: fromAlleles.State;
  form: fromStart.FormState;
  post: fromStart.PostState;
}

export interface State extends fromRoot.State {
  start: StartState;
}

export const reducers = {
  inputs: fromInputs.reducer,
  algorithms: fromAlgorithms.reducer,
  alleles: fromAlleles.reducer,
  form: fromStart.formReducer,
  post: fromStart.postReducer
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

export const getInputsState = createSelector(
  getStartState,
  state => state.inputs
);

export const getAlgorithmsState = createSelector(
  getStartState,
  state => state.algorithms
);

export const getAllelesState = createSelector(
  getStartState,
  state => state.alleles
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

export const {
  selectEntities: getAlgorithms,
  selectAll: getAllAlgorithms,
} = fromAlgorithms.adapter.getSelectors(getAlgorithmsState);

export const {
  selectEntities: getAlleles,
  selectAll: getAllAlleles,
} = fromAlleles.adapter.getSelectors(getAllelesState);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */

export const getFormState = createSelector(
  getStartState,
  state => state.form
);

// if you need to get a single control, don't pipe getFormControls and then map
// a function that selects your control - instead use the getFormControl function
// as it will provide a memoized selector for the control
export const getFormControls = createSelector(
  getFormState,
  form => form.state.controls
);

export const getFormControl = (field: string) => createSelector(
  getFormControls,
  controls => controls[field]
);

export const getSubmittedValue = createSelector(
  getStartState,
  state => state.form.submittedValue
);

export const getPostState = createSelector(
  getStartState,
  state => state.post
);

export const getAllInputsFlattened = createSelector(
  getAllInputs,
  (inputs) => {
    let flatInputs = [];
    let dir = '~pVAC-Seq';

    function groupFiles(dir, contents) {
      contents.forEach((item) => {
        if (item.type === "file") {
          let option = {
            display_name: item.display_name,
            fileID: item.fileID,
            directory: dir
          }
          flatInputs.push(option);
        } else if (item.type === "directory") {
          dir = dir + '/' + item.display_name;
          groupFiles(dir, item.contents);
        }
      })
    }
    groupFiles(dir, inputs);
    return flatInputs;
  }
)
