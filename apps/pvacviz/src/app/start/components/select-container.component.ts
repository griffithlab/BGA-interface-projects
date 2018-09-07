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
import { FormControlState, ValidationErrors } from 'ngrx-forms';

import { PvzSelect } from './select.directive';

@Component({
  selector: 'pvz-select-container',
  templateUrl: './select-container.component.html',
  styleUrls: ['./select-container.component.scss'],
  host: {
    '[class.clr-form-control]': 'true',
    '[class.clr-row]': 'true'
  }
})
export class PvzSelectContainer implements AfterViewInit, OnDestroy {
  @HostBinding('class.clr-error') isInvalid: boolean = false;
  @ContentChild(PvzSelect) pvzSelect: PvzSelect;
  // @ContentChildren(PvzSelect) pvzSelect: QueryList<PvzSelect>;
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
      this.pvzSelect.control$.subscribe((control: FormControlState<any>) => {
        // add id to select
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
