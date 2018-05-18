import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import * as fromProcesses from '../../reducers';

@Component({
  selector: 'pvz-bokeh-visualization',
  templateUrl: './bokeh-visualization.component.html',
  styleUrls: ['./bokeh-visualization.component.scss']
})
export class BokehVisualizationComponent implements OnInit {
  processId$: Observable<number>;
  fileId$: Observable<number>;

  constructor(private store: Store<fromProcesses.State>) {
    this.processId$ = store.pipe(select(fromProcesses.getRouteProcessId));
    this.fileId$ = store.pipe(select(fromProcesses.getRouteFileId));
  }

  ngOnInit() { }

}
