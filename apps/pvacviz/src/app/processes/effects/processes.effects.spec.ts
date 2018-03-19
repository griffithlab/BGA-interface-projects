import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { ProcessesEffects } from './processes.effects';

describe('ProcessesService', () => {
  let actions$: Observable<any>;
  let effects: ProcessesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProcessesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ProcessesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
