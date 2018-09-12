import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
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

export class ManagePageComponent implements OnInit {

  processes$: Observable<Process[]>;
  processesMeta$: Observable<ApiMeta>; // paging data from processes endpoint request
  inputFiles$: Observable<string[]>;
  count = 10;
  page = 1;
  constructor(private store: Store<fromCore.State>) {
    this.processes$ = store.pipe(select(fromCore.getAllProcesses));
    this.processesMeta$ = store.pipe(select(fromCore.getProcessesMeta));
    this.processes$.subscribe((processes) => {
      console.log('processes$ updated -=-=-=-=-=-=-=-=-');
      console.log(this.processes$);
    })
  }

  // initially this component had an onInit function, clr-datagrid emits a refresh event
  // that calls process.Load, so the client was making the Load query twice in a row.
  onRefresh($event) {
    const page = Math.ceil(($event.page.from + 1) / $event.page.size);
    const sortField = ($event.sort.by as string).split('.').pop();
    const sortOrder = $event.sort.reverse ? '-' : '+';
    const req = { page: page, count: $event.page.size, sorting: sortOrder + sortField };
    this.store.dispatch(new processes.Load(req))
  }

  onArchive(processId) {
    this.store.dispatch(new processes.Archive(processId));
  }

  onReload() {
    this.store.dispatch(new processes.Load());
  }
}
