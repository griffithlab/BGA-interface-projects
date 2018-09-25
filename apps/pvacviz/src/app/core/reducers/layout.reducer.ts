import { LayoutActionTypes, LayoutActions } from '../actions/layout.actions';
import { ModalConfig, ModalInitialState } from '../models/layout.model';

export interface State {
  modalOpen: boolean;
  modal: ModalConfig;
}

const initialState: State = {
  modalOpen: false,
  modal: ModalInitialState
};

export function reducer(
  state: State = initialState,
  action: LayoutActions
): State {
  switch (action.type) {

    case LayoutActionTypes.OpenModal:
      return {
        ...state,
        modalOpen: true,
        modal: action.payload
      };

    case LayoutActionTypes.CloseModal:
      return {
        ...state,
        modalOpen: false,
        modal: ModalInitialState
      };

    default:
      return state;
  }
}
