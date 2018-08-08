import { Routes } from '@angular/router';

import { NotFoundComponent } from '@pvz/core/containers/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/manage', pathMatch: 'full' },
  {
    path: 'start',
    loadChildren: './start/start.module#StartModule',
  },
  {
    path: 'manage',
    loadChildren: './manage/manage.module#ManageModule',
  },
  {
    path: 'review',
    loadChildren: './review/review.module#ReviewModule',
  },
  {
    path: 'visualize',
    loadChildren: './visualize/visualize.module#VisualizeModule',
  },
  { path: '**', component: NotFoundComponent },
];
