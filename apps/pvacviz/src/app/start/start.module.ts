import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ClarityModule } from '@clr/angular';
import { NgSelectModule } from '@ng-select/ng-select';

import { StartRoutingModule } from './start-routing.module';
import { InputsEffects } from './effects/inputs.effects';
import { StartEffects } from './effects/start.effects';
import { AlgorithmsEffects } from './effects/algorithms.effects';
import { reducers } from './reducers';

import { StartPageComponent } from './containers/start-page/start-page.component';
import { OptionList } from './containers/start-page/option-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    NgSelectModule,
    StartRoutingModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('start', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([
      InputsEffects,
      StartEffects,
      AlgorithmsEffects
    ])
  ],
  declarations: [
    StartPageComponent,
    OptionList
  ],
})
export class StartModule { }
