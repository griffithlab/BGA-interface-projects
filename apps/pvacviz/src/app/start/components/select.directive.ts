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
import { FormControlState } from 'ngrx-forms';

@Directive({
  selector: '[pvzSelect]',
})
export class PvzSelect implements OnChanges {
  @Input('ngrxFormControlState') public control: FormControlState<any>;
  public control$: Subject<FormControlState<any>>;

  constructor() {
    console.log('-=-=-=-=-=-=-=-=-=- pvzSelect instantiated');
    this.control$ = new Subject();
  }

  ngOnChanges(changes: SimpleChanges) {
    const controlCh = changes.control;
    // push latest control state to observers
    this.control$.next(controlCh.currentValue);
  }

  ngAfterViewInit() {
    if (!this.control) {
      throw new Error(
        'pvzSelect can only be used with a ngrx-forms control, please add [ngrxFormControlState] to the input'
      );
    }
  }
}
