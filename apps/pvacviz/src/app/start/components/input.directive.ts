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
    console.log('pvzInput onChanges called.');
    console.log(changes);
    const controlCh = changes.control;
    if (controlCh.firstChange === true) {
      this.renderer.setAttribute(this.element.nativeElement, 'disabled', controlCh.currentValue.isDisabled.toString());
    } else if (controlCh.previousValue.isDisabled !== controlCh.currentValue.isDisabled) {
      this.renderer.setAttribute(this.element.nativeElement, 'disabled', controlCh.currentValue.isDisabled.toString());
    }
  }

  ngOnInit() {
  }

}
