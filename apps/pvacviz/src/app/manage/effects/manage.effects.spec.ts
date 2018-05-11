import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { ProcessEffects } from './manage.effects';

describe('ProcessesService', () => {
  let actions$: Observable<any>;
  let effects: ProcessEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProcessEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ProcessEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
