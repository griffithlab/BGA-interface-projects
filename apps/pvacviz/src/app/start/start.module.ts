import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgrxFormsModule } from 'ngrx-forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { NgSelectModule } from '@ng-select/ng-select';

// misc
import { PrettyJsonModule } from 'angular2-prettyjson';

import {
  ValidationMessageComponent,
  ValidationMessagesComponent
} from './components/validation-messages.component';
import { StartRoutingModule } from './start-routing.module';
import { InputsEffects } from './effects/inputs.effects';
import { StartEffects } from './effects/start.effects';
import { AlgorithmsEffects } from './effects/algorithms.effects';
import { AllelesEffects } from './effects/alleles.effects';
import { reducers } from './reducers';

import { PvzSelect } from './components/select.directive';
import { PvzInputContainer } from './components/input-container.component';
import { PvzInput } from './components/input.directive';
import { StartPageComponent } from './containers/start-page/start-page.component';

@NgModule({
  imports: [
    CommonModule,
    NgrxFormsModule,
    ClarityModule,
    ClrFormsNextModule,
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
      AlgorithmsEffects,
      AllelesEffects
    ]),
    PrettyJsonModule
  ],
  declarations: [
    StartPageComponent,
    PvzInputContainer,
    PvzInput,
    PvzSelect,
    ValidationMessageComponent,
    ValidationMessagesComponent,
  ]
})
export class StartModule { }
