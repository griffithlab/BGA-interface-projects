import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Process } from '../../../core/models/process.model';
import { SortOrder } from '@clr/angular';

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
