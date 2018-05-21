import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizePageComponent } from './containers/visualize-page/visualize-page.component';
import { VisualizeFileComponent } from './containers/visualize-file/visualize-file.component';

const routes: Routes = [
  {
    path: '',
    component: VisualizePageComponent
  },
  {
    path: 'process/:processId/results/:fileId',
    component: VisualizeFileComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VisualizeRoutingModule { }
