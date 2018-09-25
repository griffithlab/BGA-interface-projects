import { Component, Input } from '@angular/core';

@Component({
  selector: "recursive-treeview",
  templateUrl: './recursive-treeview.component.html',
  styleUrls: ['./recursive-treeview.component.scss']
})
export class RecursiveTreeviewComponent {
  @Input() item: any;
  @Input() processId: number;
}
