import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidenav = '[App] Open Sidenav',
  CollapseSidenav = '[App] Close Sidenav',
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
}

export class CollapseSidenav implements Action {
  readonly type = LayoutActionTypes.CollapseSidenav;
}

export type LayoutActions = OpenSidenav | CollapseSidenav;
