import { Component, ContentChild, OnDestroy, Optional } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pvz-input-container',
  template: `
        <ng-content select="label"></ng-content>
        <div class="clr-control-container">
            <div class="clr-input-wrapper">
                <ng-content select="[pvzInput]"></ng-content>
                <clr-icon *ngIf="invalid" class="clr-validate-icon" shape="exclamation-circle"></clr-icon>
            </div>
            <ng-content select="clr-control-helper" *ngIf="!invalid"></ng-content>
            <ng-content select="clr-control-error" *ngIf="invalid"></ng-content>
        </div>
    `,
  host: {
    '[class.clr-form-control]': 'true',
    '[class.clr-row]': 'true'
  }
})
export class PvzInputContainer implements OnDestroy {
  subscriptions: Subscription[] = [];
  invalid = false;

  constructor() { }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.map(sub => sub.unsubscribe());
    }
  }
}
