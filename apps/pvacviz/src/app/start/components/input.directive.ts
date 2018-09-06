import {
  Directive,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  Attribute,
  Input,
  HostBinding,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormControlState, ValidationErrors } from 'ngrx-forms';


@Directive({
  selector: '[pvzInput]',
  host: { '[class.clr-input]': 'true' }
})
export class PvzInput implements OnChanges {
  @HostBinding('disabled') disabled: boolean = false;
  @Input('ngrxFormControlState') public control: FormControlState<any>;
  public control$: Subject<FormControlState<any>>;

  constructor(
    @Attribute('type') public type: string,
  ) {
    this.control$ = new Subject();
  }

  ngOnChanges(changes: SimpleChanges) {
    const controlCh = changes.control;
    // push latest control state to observers
    this.control$.next(controlCh.currentValue);
    this.disabled = controlCh.currentValue.isDisabled;
  }

  ngAfterViewInit() {
    if (!this.control) {
      throw new Error(
        'pvzInput can only be used with a ngrx-forms control, please add [ngrxFormControlState] to the input'
      );
    }

  }
}
