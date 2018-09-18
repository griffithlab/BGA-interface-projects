import { Action } from '@ngrx/store';

export interface ModalConfig {
  message: string;
  labels: {
    title: string;
    buttons: {
      confirm: string;
      cancel: string;
    }
  }
  actions: {
    confirm: Action;
    cancel: Action;
  }
}

export const ModalInitialState = {
  message: undefined,
  labels: {
    title: '',
    buttons: {
      confirm: 'OK',
      cancel: 'Cancel',
    }
  },
  actions: {
    confirm: undefined,
    cancel: undefined,
  }
}
