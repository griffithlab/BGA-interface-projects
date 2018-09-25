import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { take, filter, map, withLatestFrom } from 'rxjs/operators';

import { ModalConfig } from '@pvz/core/models/layout.model';
import { Process } from '@pvz/core/models/process.model';
import { ApiMeta } from '@pvz/core/models/api-responses.model';

import * as processes from '@pvz/core/actions/process.actions';
import * as layout from '@pvz/core/actions/layout.actions';
import * as fromCore from '@pvz/core/reducers';
import * as fromManage from '@pvz/manage/reducers';

@Component({
  selector: 'pvz-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ManagePageComponent implements OnInit {

  processes$: Observable<Process[]>;
  processesMeta$: Observable<ApiMeta>; // paging data from processes endpoint request
  manageState$: Observable<{}>;
  modalConfig$: Observable<ModalConfig>;
  inputFiles$: Observable<string[]>;
  count = 10;
  page = 1;
  filters = 'none';
  loaded = false;

  constructor(private store: Store<fromCore.State>) {
    this.processes$ = store.pipe(select(fromCore.getAllProcesses));
    this.processesMeta$ = store.pipe(select(fromCore.getProcessesMeta));
    this.modalConfig$ = store.pipe(select(fromCore.getModalConfig));
    this.manageState$ = store.pipe(select(fromManage.getManageState))
  }

  ngOnInit() {
    this.store.dispatch(new processes.Load({ count: 10, page: 1 }));
  }

  // initially this component had an onInit function, clr-datagrid emits a refresh event
  // that calls process.Load, so the client was making the Load query twice in a row.
  onRefresh($event) {
    const page = Math.ceil(($event.page.from + 1) / $event.page.size);
    const sortField = ($event.sort.by as string).split('.').pop();
    const sortOrder = $event.sort.reverse ? '-' : '+';
    this.page = page;
    this.count = 10;
    const req = { page: this.page, count: this.count, filters: this.filters };
    this.store.dispatch(new processes.Load(req))
  }

  onArchive(processId) {
    this.store.pipe(select(fromCore.getProcess(processId)), take(1))
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
            confirm: () => {
              this.store.dispatch(new layout.CloseModal);
              return new processes.Archive(processId);
            },
            cancel: () => new layout.CloseModal()
          }
        }
        this.store.dispatch(new layout.OpenModal(config));
      });
  }

  onStop(processId) {
    this.store.pipe(select(fromCore.getProcess(processId)), take(1))
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
            confirm: () => {
              this.store.dispatch(new layout.CloseModal);
              return new processes.Stop(processId)
            },
            cancel: () => new layout.CloseModal()
          }
        }
        this.store.dispatch(new layout.OpenModal(config));
      });
  }

  onRestart(processId) {
    this.store.pipe(select(fromCore.getProcess(processId)), take(1))
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
            confirm: () => {
              this.store.dispatch(new layout.CloseModal);
              return new processes.Restart(processId);
            },
            cancel: () => new layout.CloseModal()
          }
        }
        this.store.dispatch(new layout.OpenModal(config));
      });
  }

  onExport(processId) {
    this.store.pipe(select(fromCore.getProcess(processId)), take(1))
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
            confirm: () => {
              this.store.dispatch(new layout.CloseModal);
              return new processes.Export(processId);
            },
            cancel: () => new layout.CloseModal()
          }
        }
        this.store.dispatch(new layout.OpenModal(config));
      });
  }

  onDelete(processId) {
    this.store.pipe(select(fromCore.getProcess(processId)), take(1))
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
            confirm: () => {
              this.store.dispatch(new layout.CloseModal);
              return new processes.Delete(processId);
            },
            cancel: () => new layout.CloseModal()
          }
        }
        this.store.dispatch(new layout.OpenModal(config));
      });
  }

  onReload() {
    const req = { page: this.page, count: this.count };
    this.store.dispatch(new processes.Load(req));
  }
}
