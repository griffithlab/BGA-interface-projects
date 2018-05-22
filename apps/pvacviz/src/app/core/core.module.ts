import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ClarityModule } from '@clr/angular';

import { LayoutComponent } from './containers/layout/layout.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';

import { ProcessService } from './services/process.service';
import { InputService } from './services/inputs.service';

import { ProcessEffects } from './effects/process.effects';
import { reducers } from './reducers';

export const COMPONENTS = [
  LayoutComponent,
  NotFoundComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    StoreModule.forFeature('core', reducers),
    EffectsModule.forFeature([ProcessEffects])
  ],
  providers: [
    ProcessService,
    InputService
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})

export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
