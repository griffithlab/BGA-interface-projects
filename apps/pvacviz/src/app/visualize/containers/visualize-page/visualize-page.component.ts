import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
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
export class VisualizePageComponent implements OnInit, OnDestroy {
  processes$: Observable<Process[]>;
  processesWithVisualizableFiles$: Observable<Process[]>;
  dropboxFiles$: Observable<File[]>;
  filesItem: {};
  processItems: any[] = [];
  subscriptions: Subscription[] = [];
  req = { page: 1, count: 1000 };

  constructor(private store: Store<fromCore.State>) {
    this.processes$ = store.pipe(select(fromCore.getAllProcesses));
    this.processesWithVisualizableFiles$ = store.pipe(select(fromCore.getProcessesWithVisualizableFiles));
    this.dropboxFiles$ = store.pipe(select(fromCore.getAllDropboxFiles));

    this.subscriptions.push(
      this.dropboxFiles$.subscribe((files) => {
        this.filesItem = {
          display_name: '~/pVAC-Seq/visualize',
          type: 'directory',
          contents: files
        }
      }));

    this.subscriptions.push(
      this.processesWithVisualizableFiles$.subscribe((processes) => {
        this.processItems = processes.map((proc) => {
          return {
            display_name: proc.parameters.samplename,
            type: 'process',
            id: proc.id,
            // TODO add type to process files return objects in files.py::results_get
            contents: proc.files.map((f) => { return { ...f, type: 'file' } })
          }
        });
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(new processes.Load(this.req));
    this.store.dispatch(new dropbox.Load());
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  onProcessReload() {
    this.store.dispatch(new processes.Load(this.req));
  }

  onVizReload() {
    this.store.dispatch(new dropbox.Load());
  }
}
