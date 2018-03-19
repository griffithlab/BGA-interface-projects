import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessesPageComponent } from './containers/processes-page/processes-page.component';
const routes: Routes = [
  // { path: 'find', component: FindBookPageComponent },
  // {
  //   path: ':id',
  //   component: ViewBookPageComponent,
  //   canActivate: [BookExistsGuard],
  // },
  { path: '', component: ProcessesPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesRoutingModule { }
