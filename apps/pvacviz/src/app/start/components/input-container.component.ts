import {
  Component,
  ContentChild,
  HostBinding,
  OnDestroy,
  Optional,
  QueryList,
  ContentChildren,
  AfterViewInit,
  Attribute
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControlState, ValidationErrors } from 'ngrx-forms';

import { PvzInput } from './input.directive';

@Component({
  selector: 'pvz-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.scss'],
  host: {
    '[class.clr-form-control]': 'true',
    '[class.clr-row]': 'true'
  }
})
export class PvzInputContainer implements AfterViewInit, OnDestroy {
  @HostBinding('class.clr-error') isInvalid: boolean = false;
  @ContentChild(PvzInput) pvzInput: PvzInput;
  // @ContentChildren(PvzInput) pvzInput: QueryList<PvzInput>;
  ctrl: FormControlState<any>;
  subscriptions: Subscription[] = [];
  invalid = false;
  fieldName: string;
  id: string;

  constructor(@Attribute('field-name') public fieldName: string) {
    this.fieldName = fieldName;
    this.id = fieldName.replace(/\s+/g, '-').toLowerCase();
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.pvzInput.control$.subscribe((control: FormControlState<any>) => {
        console.log('-=-=-=- input state updated -=-=-=-=-=-');
        this.ctrl = control;
        this.isInvalid = control.isInvalid && control.isTouched && control.isUnfocused;
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.map(sub => sub.unsubscribe());
    }
  }
}
