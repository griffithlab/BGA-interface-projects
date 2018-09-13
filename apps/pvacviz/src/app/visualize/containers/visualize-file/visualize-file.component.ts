import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import 'rxjs/add/observable/of';
import { combineLatest, switchMap, withLatestFrom, filter } from 'rxjs/operators';

import { File } from '@pvz/core/models/file.model';
import { Process } from '@pvz/core/models/process.model';
import { environment } from '@pvz/environments/environment';
import * as fromCore from '@pvz/core/reducers';
import * as processes from '@pvz/core/actions/process.actions';

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

  process$: Observable<Process>;
  file$: Observable<File>;
  samplename: string;
  fileDisplayname: string;
  fileDescription: string;

  subscriptions: Subscription[] = [];

  constructor(private store: Store<fromCore.State>,
    private sanitizer: DomSanitizer) {
    this.processId$ = store.pipe(select(fromCore.getRouteProcessId));
    this.fileId$ = store.pipe(select(fromCore.getRouteFileId));
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

    this.file$ = store.pipe(select(fromCore.getSelectedFile));

    this.subscriptions.push(
      this.processId$.subscribe((id) => {
        if (id !== 0) {
          this.process$ = store.pipe(select(fromCore.getSelectedProcess));
        }
      }));

    this.subscriptions.push(
      this.fileId$.subscribe((id) => {
        this.file$ = store.pipe(select(fromCore.getSelectedFile));
      }));

    this.subscriptions.push(
      this.process$
        .pipe(filter(p => p !== undefined && p !== null))
        .subscribe((process) => {
          this.samplename = process.parameters.samplename;
        }));

    this.subscriptions.push(
      this.file$
        .pipe(filter(f => f !== undefined && f !== null))
        .subscribe((file) => {
          this.fileDisplayname = file.display_name;
          this.fileDescription = file.description;
        }));
  }

  ngOnInit() {
    this.store.dispatch(new processes.LoadDetail());
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
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
