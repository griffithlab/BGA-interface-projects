import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

// TODO: NgFofOf should have been imported along with CommonModule in process.module (?), figure out why it's required here
import { NgForOf } from '@angular/common';

import { Process } from '../../models/process.model';
import { Observable } from 'rxjs/Observable';

import * as processes from '../../actions/process.actions';
import * as fromProcesses from '../../reducers';

@Component({
  selector: 'pvz-processes-page',
  templateUrl: './processes-page.component.html',
  styleUrls: ['./processes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesPageComponent implements OnInit {

  processes$: Observable<Process[]>;

  constructor(private store: Store<fromProcesses.State>) {
    this.processes$ = store.pipe(select(fromProcesses.getAllProcesses));
  }

  ngOnInit() {
    this.store.dispatch(new processes.Load());
  }

}
