import { Routes } from '@angular/router';
import { NotFoundComponent } from './core/containers/not-found/not-found.component';

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
  { path: '**', component: NotFoundComponent },
];
