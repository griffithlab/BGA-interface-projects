import { Routes } from '@angular/router';
// import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundComponent } from './core/containers/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/processes', pathMatch: 'full' },
  {
    path: 'processes',
    loadChildren: './processes/processes.module#ProcessesModule',
    // canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
