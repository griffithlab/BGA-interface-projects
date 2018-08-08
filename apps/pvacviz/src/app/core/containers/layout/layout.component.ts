import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCore from '@pvz/core/reducers';
import * as layout from '@pvz/core/actions/layout.actions';

@Component({
  selector: 'pvz-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  collapsible: boolean = true;
  collapsed$: Observable<boolean>;

  constructor(private store: Store<fromCore.State>) {
    /**
     * Selectors can be layoutlied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.collapsed$ = this.store.pipe(select(fromCore.getCollapsed));
  }

  collapseChange($event) {
    $event ? this.store.dispatch(new layout.CollapseSidenav()) : this.store.dispatch(new layout.OpenSidenav());
  }
}
