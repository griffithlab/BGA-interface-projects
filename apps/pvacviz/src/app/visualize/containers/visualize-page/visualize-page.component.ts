import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

import { Process } from '../../../core/models/process.model';
import * as processes from '../../../core/actions/process.actions';
import * as fromCore from '../../../core/reducers';

@Component({
  selector: 'pvz-visualize-page',
  templateUrl: './visualize-page.component.html',
  styleUrls: ['./visualize-page.component.scss']
})
export class VisualizePageComponent implements OnInit {
  processes$: Observable<Process[]>;
  processesWithResults$: Observable<Process[]>

  constructor(private store: Store<fromCore.State>) {
    this.processes$ = store.pipe(select(fromCore.getAllProcesses));
    this.processesWithResults$ = this.processes$
      .map((process) => {
        return process;
      })
  }

  ngOnInit() {
    this.store.dispatch(new processes.Load());
  }

  reload() {
    this.store.dispatch(new processes.Load());
  }
}
