import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Process } from '../../../core/models/process.model';
import { Observable } from 'rxjs/Observable';

import * as processes from '../../actions/manage.actions';
import * as fromProcesses from '../../reducers';

@Component({
  selector: 'pvz-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePageComponent implements OnInit {

  processes$: Observable<Process[]>;

  constructor(private store: Store<fromProcesses.State>) {
    this.processes$ = store.pipe(select(fromProcesses.getAllProcesses));
  }

  ngOnInit() {
    this.store.dispatch(new processes.Load());
  }

}
