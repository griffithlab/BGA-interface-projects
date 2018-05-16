import { Component, OnInit, Input } from '@angular/core';
import { Process } from '../../../core/models/process.model';

@Component({
  selector: 'pvz-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.scss']
})
export class ProcessTableComponent implements OnInit {
  @Input() processes: Process[];

  constructor() { }

  ngOnInit() {
  }

}
