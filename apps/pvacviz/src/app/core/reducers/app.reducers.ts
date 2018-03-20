import { LayoutActionTypes, LayoutActions } from '../actions/app.actions';

export interface State {
  collapsed: boolean;
}

const initialState: State = {
  collapsed: false,
};

export function reducer(
  state: State = initialState,
  action: LayoutActions
): State {
  switch (action.type) {
    case LayoutActionTypes.CollapseSideNav:
      return {
        collapsed: false,
      };

    case LayoutActionTypes.OpenSidenav:
      return {
        collapsed: true,
      };

    default:
      return state;
  }
}

export const getCollapsed = (state: State) => state.collapsed;
