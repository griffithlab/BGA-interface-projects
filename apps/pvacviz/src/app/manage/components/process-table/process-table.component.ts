import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

import { SortOrder, ClrDatagridComparatorInterface, ClrDatagridStateInterface } from '@clr/angular';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

import { Process } from '@pvz/core/models/process.model';
import { ApiMeta } from '@pvz/core/models/api-responses.model';
import { Parameters } from '@pvz/core/models/parameters.model';

import * as processes from '@pvz/core/actions/process.actions';
import * as fromProcesses from '@pvz/reducers';

@Component({
  selector: 'pvz-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessTableComponent {
  @Input() processes: Process[];
  @Input() meta: ApiMeta;
  @Output() refresh = new EventEmitter<ClrDatagridStateInterface>();
  @Output() archive = new EventEmitter<number>();
  ascSort;
  descSort;

  constructor(private store: Store<fromProcesses.State>) {
    this.ascSort = SortOrder.Asc;
    this.descSort = SortOrder.Desc;

    console.log(this.processes);
  }

  onRefresh($event: ClrDatagridStateInterface) {
    console.log($event);
    this.refresh.emit($event);
  }

  onArchive(processId: number) {
    this.archive.emit(processId)
  }

}
