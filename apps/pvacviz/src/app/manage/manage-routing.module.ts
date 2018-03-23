import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePageComponent } from './containers/manage-page/manage-page.component';
const routes: Routes = [
  // { path: 'find', component: FindBookPageComponent },
  // {
  //   path: ':id',
  //   component: ViewBookPageComponent,
  //   canActivate: [BookExistsGuard],
  // },
  { path: '', component: ManagePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
