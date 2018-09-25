import { Component, Input } from '@angular/core';

@Component({
  selector: "recursive-treeview",
  templateUrl: './recursive-treeview.component.html'
})
export class RecursiveTreeviewComponent {
  @Input() item: any;
  @Input() processId: number;
}
