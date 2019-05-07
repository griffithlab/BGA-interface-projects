import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import 'rxjs/add/observable/of';
import { take, switchMap, withLatestFrom } from 'rxjs/operators';

import { ConfigService } from '@pvz/core/services/config.service';

import { File } from '@pvz/core/models/file.model';
import { Process } from '@pvz/core/models/process.model';
import * as fromCore from '@pvz/core/reducers';
import * as processes from '@pvz/core/actions/process.actions';
import * as dropbox from '@pvz/core/actions/dropbox.actions';

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
    private conf: ConfigService,
    private sanitizer: DomSanitizer) {

    this.processId$ = store.pipe(select(fromCore.getRouteProcessId));
    this.fileId$ = store.pipe(select(fromCore.getRouteFileId));
    this.visualizeUrl$ = this.processId$.pipe(
      withLatestFrom(this.fileId$),
      switchMap(
        ([processId, fileId]) => {
          console.log('processId: ' + processId + '; fileId: ' + fileId);
          const visualizeUrl = this.conf.bokehUrl() + '/processes/' +
            processId + '/results/' + fileId + '/visualize';
          return Observable.of(this.sanitizer.bypassSecurityTrustResourceUrl(visualizeUrl));
        }
      )
    );

    this.file$ = store.pipe(select(fromCore.getSelectedFile));
    this.process$ = store.pipe(select(fromCore.getSelectedProcess));
  }

  ngOnInit() {
    this.file$.subscribe((f) => {
      console.log(f);
    });

    this.processId$
      .pipe(take(1))
      .subscribe((id) => {
        if (id > 0) {
          this.store.dispatch(new processes.LoadDetail());
        } else {
          this.store.dispatch(new dropbox.Load());
        }
      });
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }
}
