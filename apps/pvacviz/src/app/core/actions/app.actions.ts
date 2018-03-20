import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidenav = '[App] Open Sidenav',
  CollapseSideNav = '[App] Close Sidenav',
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
}

export class CollapseSideNav implements Action {
  readonly type = LayoutActionTypes.CollapseSideNav;
}

export type LayoutActions = OpenSidenav | CollapseSideNav;
