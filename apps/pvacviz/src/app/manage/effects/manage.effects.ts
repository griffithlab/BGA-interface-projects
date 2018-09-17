import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import {
  map,
  switchMap,
  catchError,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { Process } from '@pvz/core/models/process.model';
import { ProcessService } from '@pvz/core/services/process.service';
import {
  ManageActionTypes,
  ManageActions,
  Load,
  LoadSuccess,
  LoadFail,
  Remove,
  LoadDetail,
  LoadDetailSuccess,
  LoadDetailFail,
  Archive,
  ArchiveSuccess,
  ArchiveFail
} from '@pvz/manage/actions/manage.actions';

import * as fromRoot from '@pvz/reducers';
import { Store, select } from '@ngrx/store';

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
