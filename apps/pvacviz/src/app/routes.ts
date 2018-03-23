import { Routes } from '@angular/router';
// import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundComponent } from './core/containers/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/manage', pathMatch: 'full' },
  {
    path: 'manage',
    loadChildren: './manage/manage.module#ManageModule',
    // canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
