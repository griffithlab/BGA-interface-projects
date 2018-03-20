import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../reducers';
import * as app from '../../actions/app.actions';

@Component({
  selector: 'pvz-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  collapsible: boolean = true;
  collapsed$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.collapsed$ = this.store.pipe(select(fromRoot.getCollapsed));
  }

  collapseChange($event) {
    $event ? this.store.dispatch(new app.CollapseSidenav()) : this.store.dispatch(new app.OpenSidenav());
  }
}
