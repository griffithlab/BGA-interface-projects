import {
  Directive,
  HostListener,
  Optional,
  ViewContainerRef,
  OnInit,
  Attribute,
  Input,
} from '@angular/core';
import { FormControlState, ValidationErrors } from 'ngrx-forms';


@Directive({
  selector: '[pvzInput]',
  host: { '[class.clr-input]': 'true' }
})
export class PvzInput implements OnInit {
  @Input('ngrxFormControlState') public control$: FormControlState<any>;
  constructor(
    @Attribute('disabled') public disabled: boolean,
    @Attribute('type') public type: string,
  ) {
    Promise.resolve(null).then(() => {
      if (!this.control$) {
        throw new Error(
          'pvzInput can only be used with a ngrx-forms control, add ngrxFormControlState to the input'
        );
      } else {
        console.log('ngrxFormControlState found on pvzInput.');
      }
    })
  }

  ngOnInit() {
  }

}
