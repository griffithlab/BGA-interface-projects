import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Process } from '../../../core/models/process.model';
import { SortOrder, ClrDatagridComparatorInterface } from '@clr/angular';

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

  private idComparator = new IdComparator();

  constructor() {
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

}

class IdComparator implements ClrDatagridComparatorInterface<Process> {
  compare(a: Process, b: Process) {
    return a.id - b.id;
  }
}
