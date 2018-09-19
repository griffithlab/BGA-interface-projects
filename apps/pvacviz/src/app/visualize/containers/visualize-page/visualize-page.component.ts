import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

import { File } from '@pvz/core/models/file.model';
import { Process } from '@pvz/core/models/process.model';
import * as dropbox from '@pvz/core/actions/dropbox.actions';
import * as processes from '@pvz/core/actions/process.actions';
import * as fromCore from '@pvz/core/reducers';

@Component({
  selector: 'pvz-visualize-page',
  templateUrl: './visualize-page.component.html',
  styleUrls: ['./visualize-page.component.scss']
})
export class VisualizePageComponent implements OnInit {
  processes$: Observable<Process[]>;
  processesWithVisualizableFiles$: Observable<Process[]>;
  dropboxFiles$: Observable<File[]>;
  req = { page: 1, count: 1000 };
  constructor(private store: Store<fromCore.State>) {
    this.processes$ = store.pipe(select(fromCore.getAllProcesses));
    this.processesWithVisualizableFiles$ = store.pipe(select(fromCore.getProcessesWithVisualizableFiles));
    this.dropboxFiles$ = store.pipe(select(fromCore.getAllDropboxFiles));
  }

  ngOnInit() {
    this.store.dispatch(new processes.Load(this.req));
    this.store.dispatch(new dropbox.Load());
  }

  reload() {
    this.store.dispatch(new processes.Load(this.req));
  }
}
