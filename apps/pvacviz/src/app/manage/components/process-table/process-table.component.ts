import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { SortOrder, ClrDatagridComparatorInterface } from '@clr/angular';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';

import { Process } from '@pvz/core/models/process.model';
import { Parameters } from '@pvz/core/models/parameters.model';

import * as processes from '@pvz/manage/actions/manage.actions';
import * as fromProcesses from '@pvz/reducers';

@Component({
  selector: 'pvz-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessTableComponent implements OnInit {
  @Input() processes: Process[];

  ascSort;
  descSort;

  idComparator = new IdComparator();

  constructor(private store: Store<fromProcesses.State>) {
    this.ascSort = SortOrder.Asc;
    this.descSort = SortOrder.Desc;

    console.log(this.processes);

    // this.processes = this.processes.map((process) => {
    //   return process;
    // })

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
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
