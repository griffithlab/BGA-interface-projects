import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessesRoutingModule } from './processes-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromProcesses from './reducers/processes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProcessEffects } from './effects/process.effects';
import { ProcessesPageComponent } from './containers/processes-page/processes-page.component';

@NgModule({
  imports: [
    CommonModule,
    ProcessesRoutingModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('processes', fromProcesses.reducer),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([ProcessEffects])
  ],
  declarations: [ProcessesPageComponent]
})
export class ProcessesModule { }
