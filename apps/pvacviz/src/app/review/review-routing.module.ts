import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewPageComponent } from './containers/review-page/review-page.component';

const routes: Routes = [
  { path: '', component: ReviewPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReviewRoutingModule { }
