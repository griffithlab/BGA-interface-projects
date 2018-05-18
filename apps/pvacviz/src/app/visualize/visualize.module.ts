import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { VisualizeRoutingModule } from './visualize-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { VisualizeEffects } from './effects/visualize.effects';
import { VisualizePageComponent } from './containers/visualize-page/visualize-page.component';
import { BokehVisualizationComponent } from './components/bokeh-visualization/bokeh-visualization.component';

// import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    VisualizeRoutingModule,
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
     * eagerly or lazily and will be visualizeed immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    // EffectsModule.forFeature([ProcessEffects])
  ],
  declarations: [VisualizePageComponent, BokehVisualizationComponent]
})
export class VisualizeModule { }
