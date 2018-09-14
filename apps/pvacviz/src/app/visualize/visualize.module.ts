import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { VisualizeRoutingModule } from './visualize-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { VisualizePageComponent } from './containers/visualize-page/visualize-page.component';
import { BokehVisualizationComponent } from './components/bokeh-visualization/bokeh-visualization.component';
import { VisualizeFileComponent } from './containers/visualize-file/visualize-file.component';
import { ConsolePipe } from '@pvz/core/pipes/console.pipe';

// import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    VisualizeRoutingModule,
    PrettyJsonModule
  ],
  declarations: [
    VisualizePageComponent,
    BokehVisualizationComponent,
    VisualizeFileComponent,
    ConsolePipe
  ],
  exports: [ConsolePipe]
})
export class VisualizeModule { }
