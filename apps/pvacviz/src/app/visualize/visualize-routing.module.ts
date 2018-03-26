import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualizePageComponent } from './containers/visualize-page/visualize-page.component';

const routes: Routes = [
  { path: '', component: VisualizePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VisualizeRoutingModule { }
