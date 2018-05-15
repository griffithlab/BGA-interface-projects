import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Process } from '../../../core/models/process.model';
import { Parameters } from '../../../core/models/parameters.model';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

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
  log$: Observable<string[]>;
  parameters$: Observable<Parameters>;
  alleles$: Observable<any>;

  constructor(private store: Store<fromProcesses.State>) {
    this.process$ = store.pipe(select(fromProcesses.getSelectedProcess));
    this.parameters$ = this.process$.pipe(filter(val => !!val), map(process => process.parameters));
    this.log$ = this.process$.pipe(filter(val => !!val), map(process => process.log));
    this.alleles$ = this.parameters$.pipe(filter(val => !!val), map(params => params.alleles));
  }

  ngOnInit() {
    this.store.dispatch(new processes.LoadDetail());
  }

}
