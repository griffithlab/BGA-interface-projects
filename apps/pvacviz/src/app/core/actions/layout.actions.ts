import { Action } from '@ngrx/store';
import { ModalConfig } from '../models/layout.model';
import { Modal } from '../../../../../../node_modules/@clr/angular';

export enum LayoutActionTypes {
  OpenSidenav = '[App] Open Sidenav',
  CollapseSidenav = '[App] Close Sidenav',
  OpenModal = '[App] Open Modal',
  CloseModal = '[App] Close Modal'
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
}

export class CollapseSidenav implements Action {
  readonly type = LayoutActionTypes.CollapseSidenav;
}

export class OpenModal implements Action {
  readonly type = LayoutActionTypes.OpenModal;

  constructor(public payload: ModalConfig) { }
}

export class CloseModal implements Action {
  readonly type = LayoutActionTypes.CloseModal;

  constructor() { }
}

export type LayoutActions =
  OpenSidenav | CollapseSidenav
  | OpenModal | CloseModal;
