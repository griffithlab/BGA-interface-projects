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
export class AppComponent implements OnInit {
  collapsible: boolean = true;
  collapsed: boolean = true;
  collapsed$: Observable<boolean>;

  ngOnInit() {
  }


  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.collapsed$ = this.store.pipe(select(fromRoot.getCollapsed));
  }

  collapseSideNav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new app.CollapseSideNav());
  }

  openSidenav() {
    this.store.dispatch(new app.OpenSidenav());
  }
}
