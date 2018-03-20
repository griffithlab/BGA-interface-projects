import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidenav = '[App] Open Sidenav',
  CloseSidenav = '[App] Close Sidenav',
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CloseSidenav;
}

export type LayoutActions = OpenSidenav | CloseSidenav;
