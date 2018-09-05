import { Component, ContentChild, OnDestroy, Optional, QueryList, ContentChildren, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControlState, ValidationErrors } from 'ngrx-forms';

import { PvzInput } from './input.directive';

@Component({
  selector: 'pvz-input-container',
  templateUrl: './input-container.component.html',
  host: {
    '[class.clr-form-control]': 'true',
    '[class.clr-row]': 'true'
  }
})
export class PvzInputContainer implements AfterViewInit, OnDestroy {
  @ContentChildren(PvzInput) pvzInput: QueryList<PvzInput>;
  control: FormControlState<any>;
  subscriptions: Subscription[] = [];
  invalid = false;

  constructor() { }

  ngAfterViewInit() {
    this.pvzInput.changes.subscribe((changes) => {
      console.log('input-container noticed changes from child input.');
      console.log(changes);
    });
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.map(sub => sub.unsubscribe());
    }
  }
}
