import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
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
  ascSort;
  descSort;

  idComparator = new IdComparator();

  currentPage: number;
  pageSize: number;
  totalItems: number;
  lastPage: number;

  constructor(private store: Store<fromProcesses.State>) {
    this.ascSort = SortOrder.Asc;
    this.descSort = SortOrder.Desc;

    console.log(this.processes);
  }

  onRefresh($event: ClrDatagridStateInterface) {
    console.log($event);
    const page = Math.ceil(($event.page.from + 1) / $event.page.size);
    const req = { page: page, count: $event.page.size };
    this.store.dispatch(new processes.Load(req))
  }

  onArchive(processId) {
    this.store.dispatch(new processes.Archive(processId));
  }

}

class IdComparator implements ClrDatagridComparatorInterface<Process> {
  compare(a: Process, b: Process) {
    return a.id - b.id;
  }
}
