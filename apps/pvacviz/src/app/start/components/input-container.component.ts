import {
  Component,
  ContentChild,
  HostBinding,
  OnDestroy,
  Optional,
  Renderer2,
  ElementRef,
  QueryList,
  ContentChildren,
  AfterViewInit
} from '@angular/core';
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
  @HostBinding('class.clr-error') isInvalid: boolean = false;
  @ContentChild(PvzInput) pvzInput: PvzInput;
  // @ContentChildren(PvzInput) pvzInput: QueryList<PvzInput>;
  control: FormControlState<any>;
  subscriptions: Subscription[] = [];
  invalid = false;

  private r2: Renderer2;
  private el: ElementRef;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {
    this.r2 = renderer2;
    this.el = elementRef;
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.pvzInput.control$.subscribe((state: FormControlState<any>) => {
        console.log('-=-=-=- input state updated -=-=-=-=-=-');
        this.isInvalid = state.isInvalid && state.isTouched;
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.map(sub => sub.unsubscribe());
    }
  }
}
