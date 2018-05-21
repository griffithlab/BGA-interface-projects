import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as processes from '../../../manage/actions/manage.actions';
import * as fromProcesses from '../../../manage/reducers';

import { Process } from '../../../core/models/process.model';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'pvz-visualize-page',
  templateUrl: './visualize-page.component.html',
  styleUrls: ['./visualize-page.component.scss']
})
export class VisualizePageComponent implements OnInit {
  processes$: Observable<Process[]>;

  constructor(private store: Store<fromProcesses.State>) {
    // this.processes$ = store.pipe(select(fromProcesses.getAllProcesses));
  }

  ngOnInit() {
  }

}
