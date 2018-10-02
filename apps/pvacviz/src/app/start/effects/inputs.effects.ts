import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  map,
  switchMap,
  catchError,
} from 'rxjs/operators';

import { File, Files } from '@pvz/core/models/file.model';
import { InputService } from '@pvz/core/services/inputs.service';
import { ApiStartResponse } from '@pvz/core/models/api-responses.model';

import {
  InputsActionTypes,
  InputsActions,
  LoadInputs,
  LoadInputsSuccess,
  LoadInputsFail
} from '@pvz/start/actions/inputs.actions';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class InputsEffects {
  constructor(
    private actions$: Actions,
    private inputs: InputService,
  ) { }

  @Effect()
  load$: Observable<Action> = this.actions$.pipe(
    ofType<LoadInputs>(InputsActionTypes.LoadInputs),
    switchMap(action => {
      return this.inputs
        .query()
        .pipe(
          map((files: Files) => new LoadInputsSuccess(files)),
          catchError(err => of(new LoadInputsFail(err)))
        );
    })
  );
}
