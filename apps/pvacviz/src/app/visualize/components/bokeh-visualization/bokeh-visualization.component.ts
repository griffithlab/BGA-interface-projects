import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { combineLatest, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import * as fromProcesses from '../../reducers';

// move the bokehUrl stuff to a config service

@Component({
  selector: 'pvz-bokeh-visualization',
  templateUrl: './bokeh-visualization.component.html',
  styleUrls: ['./bokeh-visualization.component.scss']
})
export class BokehVisualizationComponent implements OnInit {
  processId$: Observable<number>;
  fileId$: Observable<number>;
  visualizeUrl$: Observable<string>;

  constructor(private store: Store<fromProcesses.State>,
  ) {
    this.processId$ = store.pipe(select(fromProcesses.getRouteProcessId));
    this.fileId$ = store.pipe(select(fromProcesses.getRouteFileId));
  }
  ngOnInit() {
    this.visualizeUrl$ = Observable.combineLatest(
      this.processId$,
      this.fileId$
    ).switchMap(
      function(processId, fileId) {
        return this.bokehUrl() + '/processes/' +
          processId + '/results/' + fileId + '/visualize';
      });
  }

  private server = {
    protocol: 'http://',
    domain: 'localhost',
    port: environment.production ? 8080 : 4200,
    api: 'api',
    version: 'v1'
  };

  private bokehServer = {
    protocol: 'http://',
    domain: 'localhost',
    port: 8080,
    api: 'api',
    version: 'v1'
  };

  private serverUrl() {
    return this.server.protocol +
      this.server.domain + ':' +
      this.server.port;
  }

  private japiUrl() {
    return this.server.protocol +
      this.server.domain + ':' +
      this.server.port + '/' +
      this.server.api + '/' +
      this.server.version;
  }

  private bokehUrl() {
    return this.bokehServer.protocol +
      this.bokehServer.domain + ':' +
      this.bokehServer.port + '/' +
      this.bokehServer.api + '/' +
      this.bokehServer.version;
  }
}
