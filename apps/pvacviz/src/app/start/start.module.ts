import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { StartRoutingModule } from './start-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { StartEffects } from './effects/start.effects';
import { StartPageComponent } from './containers/start-page/start-page.component';

// import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    StartRoutingModule,
    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    // StoreModule.forFeature('processes', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    // EffectsModule.forFeature([ProcessEffects])
  ],
  declarations: [StartPageComponent]
})
export class StartModule { }
