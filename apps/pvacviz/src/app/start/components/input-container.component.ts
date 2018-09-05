import { Component, ContentChild, OnDestroy, Optional, ViewChild, AfterViewInit } from '@angular/core';
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
  @ViewChild(PvzInput) pvzInput: PvzInput;
  control: FormControlState<any>;
  subscriptions: Subscription[] = [];
  invalid = false;

  constructor() { }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => {
      if (this.pvzInput) {
        console.log('-=-=-=-=-=-=- pvzInput container found child form control.')
      }
    });
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.map(sub => sub.unsubscribe());
    }
  }
}
