import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Process } from '../../../core/models/process.model';
import { Observable } from 'rxjs/Observable';

import * as processes from '../../actions/manage.actions';
import * as fromProcesses from '../../reducers';

@Component({
  selector: 'pvz-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProcessPageComponent implements OnInit {

  process$: Observable<Process>;

  constructor(private store: Store<fromProcesses.State>) {
    // TODO: integrate router and get id from state params
    // this.process$ = store.pipe(select(fromProcesses.getProcess(processId)));
  }

  ngOnInit() {
    this.store.dispatch(new processes.LoadDetail());
  }

}
