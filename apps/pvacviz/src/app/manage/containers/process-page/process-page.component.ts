import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Parameters } from '@pvz/core/models/parameters.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import { skip, take, combineLatest, filter, map } from 'rxjs/operators';

import { ModalConfig } from '@pvz/core/models/layout.model';
import { Process } from '@pvz/core/models/process.model';
import * as layout from '@pvz/core/actions/layout.actions';
import * as processes from '@pvz/core/actions/process.actions';
import * as fromCore from '@pvz/core/reducers';

@Component({
  selector: 'pvz-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProcessPageComponent implements OnInit, OnDestroy {

  process$: Observable<Process>;
  status$: Observable<string>;
  log$: Observable<string[]>;
  parameters$: Observable<Parameters>;
  alleles$: Observable<string[]>;
  epitope_lengths$: Observable<number[]>;
  prediction_algorithms$: Observable<string[]>;

  subscriptions: Subscription[] = [];

  constructor(private store: Store<fromCore.State>, private router: Router) {
    this.process$ = store.pipe(select(fromCore.getSelectedProcess));
    this.status$ = this.process$.pipe(filter(val => !!val), map((process) => {
      return process.running ? 'Running' : process.status === 1 ? 'Completed' : 'Stopped';
    }));
    this.parameters$ = this.process$.pipe(filter(val => !!val), map(process => process.parameters));
    this.log$ = this.process$.pipe(filter(val => !!val), map(process => process.log));
    this.alleles$ = this.parameters$.pipe(filter(val => !!val), map(params => params.alleles));
    this.epitope_lengths$ = this.parameters$.pipe(filter(val => !!val), map(params => params.epitope_lengths));
    this.prediction_algorithms$ = this.parameters$.pipe(filter(val => !!val), map(params => params.prediction_algorithms));

    // catch undefined processes from Archive, Delete action and pop up a modal
    this.subscriptions.push(
      this.process$.pipe(skip(1)).subscribe((proc) => {
        if (proc === undefined) {
          const config: ModalConfig = {
            message: `Requested process does not exist. Returning to Manage Process page.`,
            labels: {
              title: 'Unknown Process',
              buttons: {
                confirm: 'OK',
                cancel: 'Cancel'
              }
            },
            actions: {
              confirm: () => {
                this.router.navigate(['/', 'manage'])
                return new layout.CloseModal();
              },
              cancel: () => new layout.CloseModal()
            }
          }
          this.store.dispatch(new layout.OpenModal(config));
        }
      }));
  }

  ngOnInit() {
    this.store.dispatch(new processes.LoadDetail());
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  reload() {
    this.store.dispatch(new processes.LoadDetail());
  }

  archive() {
    this.store.dispatch(new processes.Archive());
  }

  onDelete() {
    this.process$.pipe(take(1))
      .subscribe((proc: Process) => {
        const config: ModalConfig = {
          message: `Delete ${proc.parameters.samplename}? A deleted process cannot be recovered!`,
          labels: {
            title: 'Delete Process',
            buttons: {
              confirm: 'OK',
              cancel: 'Cancel'
            }
          },
          actions: {
            confirm: () => new processes.Delete(proc.id),
            cancel: () => new layout.CloseModal()
          }
        }
        this.store.dispatch(new layout.OpenModal(config));
      });
  }

  onStop() {
    this.process$.pipe(take(1))
      .subscribe((proc: Process) => {
        const config: ModalConfig = {
          message: `Stop ${proc.parameters.samplename}?`,
          labels: {
            title: 'Stop Process',
            buttons: {
              confirm: 'OK',
              cancel: 'Cancel'
            }
          },
          actions: {
            confirm: () => new processes.Stop(proc.id),
            cancel: () => new layout.CloseModal()
          }
        }
        this.store.dispatch(new layout.OpenModal(config));
      });
  }

  onArchive() {
    this.process$.pipe(take(1))
      .subscribe((proc: Process) => {
        const config: ModalConfig = {
          message: `Archive ${proc.parameters.samplename}? Process will be moved to ~/pVACSeq/archive.`,
          labels: {
            title: 'Archive Process',
            buttons: {
              confirm: 'OK',
              cancel: 'Cancel'
            }
          },
          actions: {
            confirm: () => new processes.Archive(proc.id),
            cancel: () => new layout.CloseModal()
          }
        }
        this.store.dispatch(new layout.OpenModal(config));
      });
  }

  onRestart() {
    this.process$.pipe(take(1))
      .subscribe((proc: Process) => {
        const config: ModalConfig = {
          message: `Restart ${proc.parameters.samplename}?`,
          labels: {
            title: 'Restart Process',
            buttons: {
              confirm: 'OK',
              cancel: 'Cancel'
            }
          },
          actions: {
            confirm: () => new processes.Restart(proc.id),
            cancel: () => new layout.CloseModal()
          }
        }
        this.store.dispatch(new layout.OpenModal(config));
      });
  }

  onExport() {
    this.process$.pipe(take(1))
      .subscribe((proc: Process) => {
        const config: ModalConfig = {
          message: `Export ${proc.parameters.samplename}?`,
          labels: {
            title: 'Export Process',
            buttons: {
              confirm: 'OK',
              cancel: 'Cancel'
            }
          },
          actions: {
            confirm: () => new processes.Export(proc.id),
            cancel: () => new layout.CloseModal()
          }
        }
        this.store.dispatch(new layout.OpenModal(config));
      });
  }
}
