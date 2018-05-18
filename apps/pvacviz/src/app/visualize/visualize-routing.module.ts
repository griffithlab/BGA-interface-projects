import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizePageComponent } from './containers/visualize-page/visualize-page.component';
import { BokehVisualizationComponent } from './components/bokeh-visualization/bokeh-visualization.component';

const routes: Routes = [
  {
    path: '',
    component: VisualizePageComponent
  },
  {
    path: 'process/:processId/results/:fileId',
    component: BokehVisualizationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VisualizeRoutingModule { }
