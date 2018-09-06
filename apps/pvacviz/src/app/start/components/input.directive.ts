import {
  Directive,
  ElementRef,
  Renderer2,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  Attribute,
  Input,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormControlState, ValidationErrors } from 'ngrx-forms';


@Directive({
  selector: '[pvzInput]',
  host: { '[class.clr-input]': 'true' }
})
export class PvzInput implements OnChanges {
  @Input('ngrxFormControlState') public control: FormControlState<any>;
  @Input('disabled') public disabled: boolean;
  public control$: Subject<FormControlState<any>>;
  private r2: Renderer2;
  private el: ElementRef

  constructor(
    @Attribute('type') public type: string,
    renderer2: Renderer2,
    elementRef: ElementRef
  ) {
    this.r2 = renderer2;
    this.el = elementRef;
    this.control$ = new Subject();
  }

  ngOnChanges(changes: SimpleChanges) {
    const controlCh = changes.control;
    // push latest control state to observers
    this.control$.next(controlCh.currentValue);

    // toggle disabled attribute on input when control.isDisabled changes
    const setDisabled = (state: boolean) => {
      if (state) { this.r2.setAttribute(this.el.nativeElement, 'disabled', ''); }
      else { this.r2.removeAttribute(this.el.nativeElement, 'disabled'); }
    }

    if (controlCh.firstChange) { setDisabled(controlCh.currentValue.isDisabled); }
    else if (controlCh.previousValue.isDisabled !== controlCh.currentValue.isDisabled) {
      setDisabled(controlCh.currentValue.isDisabled);
    }
  }

  ngAfterViewInit() {
    if (!this.control) {
      throw new Error(
        'pvzInput can only be used with a ngrx-forms control, please add [ngrxFormControlState] to the input'
      );
    }

  }
}
