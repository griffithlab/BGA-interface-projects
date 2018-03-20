import { LayoutActionTypes, LayoutActions } from '../actions/app.actions';

export interface State {
  collapsed: boolean;
}

const initialState: State = {
  collapsed: true,
};

export function reducer(
  state: State = initialState,
  action: LayoutActions
): State {
  switch (action.type) {
    case LayoutActionTypes.CollapseSidenav:
      return {
        collapsed: true,
      };

    case LayoutActionTypes.OpenSidenav:
      return {
        collapsed: false,
      };

    default:
      return state;
  }
}

export const getCollapsed = (state: State) => state.collapsed;
