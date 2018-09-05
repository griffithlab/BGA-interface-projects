import {
  Directive,
  ElementRef,
  HostListener,
  Optional,
  ViewContainerRef,
  OnInit,
  Renderer2,
  OnChanges,
  SimpleChanges,
  Attribute,
  Input,
} from '@angular/core';
import { FormControlState, ValidationErrors } from 'ngrx-forms';


@Directive({
  selector: '[pvzInput]',
  host: { '[class.clr-input]': 'true' }
})
export class PvzInput implements OnInit, OnChanges {
  @Input('ngrxFormControlState') public control: FormControlState<any>;
  @Input('disabled') public disabled: boolean;
  private renderer: Renderer2;
  private element: ElementRef
  constructor(
    @Attribute('type') public type: string,
    r2: Renderer2,
    el: ElementRef
  ) {
    this.renderer = r2;
    this.element = el;
    Promise.resolve(null).then(() => {
      if (!this.control) {
        throw new Error(
          'pvzInput can only be used with a ngrx-forms control, please add [ngrxFormControlState] to the input'
        );
      }


    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const controlCh = changes.control;
    const setDisabled = (state: boolean) => {
      if (state) {
        this.renderer.setAttribute(this.element.nativeElement, 'disabled', state.toString());
      } else {
        this.renderer.removeAttribute(this.element.nativeElement, 'disabled');
      }
    }

    if (controlCh.firstChange === true) {
      setDisabled(controlCh.currentValue.isDisabled);
    } else if (controlCh.previousValue.isDisabled !== controlCh.currentValue.isDisabled) {
      setDisabled(controlCh.currentValue.isDisabled);
    }
  }

  ngOnInit() {
  }

}
