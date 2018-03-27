import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

import { Observable } from 'rxjs/Rx';

import { Store, select } from '@ngrx/store';

import { File, Files } from '../../../core/models/file.model';
import { InputService } from '../../../core/services/inputs.service';

import * as fromStartActions from '../../actions/start.actions';
import * as fromStart from '../../reducers';

@Component({
  selector: 'pvz-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})

export class StartPageComponent implements OnInit {
  // inputs$: Observable<Files>;
  inputs$: Observable<any>;

  constructor(private store: Store<fromStart.State>) {
    this.inputs$ = store.pipe(select(fromStart.getAllInputs));
    // .map((fileMap) => fileMap);
  }

  ngOnInit() {
    this.store.dispatch(new fromStartActions.LoadInputs());
  }

}
