import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { DefaultLayoutComponent } from './shared/layouts/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/home/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./pages/accounts/accounts.module').then(
            (m) => m.AccountsModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
