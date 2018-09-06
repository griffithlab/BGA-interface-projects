import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  OnChanges
} from '@angular/core';
import { FormControlState, ValidationErrors } from 'ngrx-forms';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pvz-validation-message',
  template: '<clr-control-error *ngIf="show"><ng-content></ng-content></clr-control-error>'
})
export class ValidationMessageComponent {
  @Input() name: string;

  show: boolean = false;
  error: {} = {};

  showsErrorIncludedIn(errors: ValidationErrors): boolean {
    this.error = errors[this.name];
    return Object.keys(errors).some(error => error === this.name);
  }
}

@Component({
  selector: 'pvz-validation-messages',
  template: '<ng-content></ng-content>'
})
export class ValidationMessagesComponent implements OnChanges {
  @Input() control: FormControlState<any>;
  @Input() errors: ValidationErrors;
  @ContentChildren(ValidationMessageComponent) messageComponents: QueryList<ValidationMessageComponent>;

  private statusChangesSubscription: Subscription;

  ngOnChanges() {
    Promise.resolve(null).then(() => {
      this.messageComponents.forEach(messageComponent => messageComponent.show = false);

      if (this.control.isInvalid) {
        let firstErrorMessageComponent = this.messageComponents.find(messageComponent => {
          return messageComponent.showsErrorIncludedIn(this.control.errors);
        });

        firstErrorMessageComponent.show = true;
      }
    });
  }
}
