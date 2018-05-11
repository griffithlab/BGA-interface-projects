import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePageComponent } from './containers/manage-page/manage-page.component';
import { ProcessPageComponent } from './containers/process-page/process-page.component';

const routes: Routes = [
  {
    path: '',
    component: ManagePageComponent,
  },
  {
    path: ':processId',
    component: ProcessPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
