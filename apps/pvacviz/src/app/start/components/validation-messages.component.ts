import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormControlState } from 'ngrx-forms';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pvz-validation-message',
  template: '<div *ngIf="show"><ng-content></ng-content></div>'
})
export class ValidationMessageComponent {
  @Input() name: string;
  show: boolean = false;

  showsErrorIncludedIn(errors: string[]): boolean {
    return errors.some(error => error === this.name);
  }
}

@Component({
  selector: 'pvz-validation-messages',
  template: '<ng-content></ng-content>'
})
export class ValidationMessagesComponent implements OnDestroy, OnChanges {
  @Input() for: FormControlState<any>;
  @ContentChildren(ValidationMessageComponent) messageComponents: QueryList<ValidationMessageComponent>;

  private statusChangesSubscription: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    this.messageComponents.forEach(messageComponent => messageComponent.show = false);

    if (this.for.isInvalid) {
      let firstErrorMessageComponent = this.messageComponents.find(messageComponent => {
        return messageComponent.showsErrorIncludedIn(Object.keys(this.for.errors));
      });

      firstErrorMessageComponent.show = true;
    }
  }

  ngOnDestroy() {
    this.statusChangesSubscription.unsubscribe();
  }
}
