import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ReviewRoutingModule } from './review-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { ReviewEffects } from './effects/review.effects';
import { ReviewPageComponent } from './containers/review-page/review-page.component';

// import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ReviewRoutingModule,
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
     * eagerly or lazily and will be reviewed immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    // EffectsModule.forFeature([ProcessEffects])
  ],
  declarations: [ReviewPageComponent]
})
export class ReviewModule { }
