import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

import { Process } from '@pvz/core/models/process.model';
import { ApiMeta } from '@pvz/core/models/api-responses.model';

import * as processes from '@pvz/core/actions/process.actions';
import * as fromCore from '@pvz/core/reducers';

@Component({
  selector: 'pvz-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ManagePageComponent {

  processes$: Observable<Process[]>;
  processesMeta$: Observable<ApiMeta>; // paging data from processes endpoint request
  inputFiles$: Observable<string[]>;
  count = 10;
  page = 1;
  filters = 'none';
  constructor(private store: Store<fromCore.State>) {
    this.processes$ = store.pipe(select(fromCore.getAllProcesses));
    this.processesMeta$ = store.pipe(select(fromCore.getProcessesMeta));
  }

  // initially this component had an onInit function, clr-datagrid emits a refresh event
  // that calls process.Load, so the client was making the Load query twice in a row.
  onRefresh($event) {
    const page = Math.ceil(($event.page.from + 1) / $event.page.size);
    const sortField = ($event.sort.by as string).split('.').pop();
    const sortOrder = $event.sort.reverse ? '-' : '+';
    this.page = page;
    this.count = $event.page.size;
    const req = { page: this.page, count: this.count, filters: this.filters };
    this.store.dispatch(new processes.Load(req))
  }

  onArchive(processId) {
    this.store.dispatch(new processes.Archive(processId));
  }

  onRestart(processId) {
    this.store.dispatch(new processes.Restart(processId));
  }

  onDelete(processId) {
    this.store.dispatch(new processes.Delete(processId));
  }

  onReload() {
    const req = { page: this.page, count: this.count };
    this.store.dispatch(new processes.Load(req));
  }
}
