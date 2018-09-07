import {
  Directive,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  Attribute,
  Input,
  Host
} from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subject } from 'rxjs/Subject';
import { FormControlState } from 'ngrx-forms';

@Directive({
  selector: '[pvzSelect]',
})
export class PvzSelect implements OnChanges {
  @Input('ngrxFormControlState') public control: FormControlState<any>;
  public control$: Subject<FormControlState<any>>;
  public select: NgSelectComponent;

  constructor(@Host() select: NgSelectComponent) {
    this.control$ = new Subject();
    this.select = select;
  }

  ngOnChanges(changes: SimpleChanges) {
    const ctrl = changes.control;
    // push latest control state to observers
    this.control$.next(ctrl.currentValue);
    // update select disabled state based on control.isDisabled
    if (ctrl.firstChange || (ctrl.previousValue.isDisabled !== ctrl.currentValue.isDisabled)) {
      this.select.setDisabledState(ctrl.currentValue.isDisabled);
    }
  }

  ngAfterViewInit() {
    if (!this.control) {
      throw new Error(
        'pvzSelect can only be used with a ngrx-forms control, please add [ngrxFormControlState] to the input'
      );
    }
  }
}
