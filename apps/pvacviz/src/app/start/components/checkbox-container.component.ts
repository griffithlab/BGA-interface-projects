import {
  Component,
  ContentChild,
  HostBinding,
  OnDestroy,
  Renderer2,
  ElementRef,
  Optional,
  QueryList,
  ContentChildren,
  AfterViewInit,
  Attribute
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControlState } from 'ngrx-forms';

import { PvzCheckbox } from './checkbox.directive';

@Component({
  selector: 'pvz-checkbox-container',
  templateUrl: './checkbox-container.component.html',
  styleUrls: ['./checkbox-container.component.scss'],
  host: {
    '[class.clr-form-control]': 'true',
    '[class.clr-row]': 'true'
  }
})
export class PvzCheckboxContainer implements AfterViewInit, OnDestroy {
  @HostBinding('class.clr-error') isInvalid: boolean = false;
  @ContentChild(PvzCheckbox) pvzCheckbox: PvzCheckbox;
  ctrl: FormControlState<any>;
  subscriptions: Subscription[] = [];
  invalid = false;
  private r2: Renderer2;
  private el: ElementRef;

  constructor(@Attribute('field-name') public fieldName: string, renderer2: Renderer2, elementRef: ElementRef) {
    this.r2 = renderer2;
    this.el = elementRef;
  }

  ngAfterViewInit() {
    let idSet = false;
    this.subscriptions.push(
      this.pvzCheckbox.control$.subscribe((control: FormControlState<any>) => {
        // add id to checkbox
        if (idSet === false) {

          this.r2.setAttribute(this.el.nativeElement, 'id', control.id); idSet = true;
        }
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
