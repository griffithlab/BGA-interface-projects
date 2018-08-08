import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

import { Process } from '@pvz/core/models/process.model';
import * as processes from '@pvz/core/actions/process.actions';
import * as fromCore from '@pvz/core/reducers';

@Component({
  selector: 'pvz-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ManagePageComponent implements OnInit {

  processes$: Observable<Process[]>;
  inputFiles$: Observable<string[]>;

  constructor(private store: Store<fromCore.State>) {
    this.processes$ = store.pipe(select(fromCore.getAllProcesses));
    this.inputFiles$ = this.processes$.pipe(filter(val => !!val), map(
      (processes) => {
        return processes.map((process) => {
          return process.parameters.input
            .split('/')
            .slice(-2)
            .join('/');
        });
      }
    ))
  }

  ngOnInit() {
    this.store.dispatch(new processes.Load());
  }

  reload() {
    this.store.dispatch(new processes.Load());
  }

  archive(id) {
    this.store.dispatch(new processes.Archive(id));
  }
}
