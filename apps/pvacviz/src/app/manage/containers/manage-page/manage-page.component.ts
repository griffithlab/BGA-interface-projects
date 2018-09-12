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

  ngOnInit() {
    this.store.dispatch(new processes.Load({ count: this.count, page: this.page, sorting: 'asc:id' }));
  }


  reload() {
    this.store.dispatch(new processes.Load());
  }

  archive(id) {
    this.store.dispatch(new processes.Archive(id));
  }
}
