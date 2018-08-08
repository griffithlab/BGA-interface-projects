import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { combineLatest, switchMap, withLatestFrom } from 'rxjs/operators';

import { environment } from '@pvz/environments/environment';
import * as fromProcesses from '@pvz/visualize/reducers';


@Component({
  selector: 'pvz-visualize-file',
  templateUrl: './visualize-file.component.html',
  styleUrls: ['./visualize-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizeFileComponent implements OnInit {
  processId$: Observable<number>;
  fileId$: Observable<number>;
  visualizeUrl$: Observable<SafeResourceUrl>;

  constructor(private store: Store<fromProcesses.State>,
    private sanitizer: DomSanitizer) {
    this.processId$ = store.pipe(select(fromProcesses.getRouteProcessId));
    this.fileId$ = store.pipe(select(fromProcesses.getRouteFileId));
    this.visualizeUrl$ = this.processId$.pipe(
      withLatestFrom(this.fileId$),
      switchMap(
        ([processId, fileId]) => {
          console.log('processId: ' + processId + '; fileId: ' + fileId);
          const visualizeUrl = this.bokehUrl() + '/processes/' +
            processId + '/results/' + fileId + '/visualize';
          return Observable.of(sanitizer.bypassSecurityTrustResourceUrl(visualizeUrl));
        }
      )
    );
  }

  ngOnInit() { }
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
