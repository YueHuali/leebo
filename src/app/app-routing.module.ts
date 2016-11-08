import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { HomeRootComponent } from './home-root/home-root.component';
import { UnauthenticatedGuard } from './unauthenticated.guard';

import { HomeRootRoutes } from './home-root/home-root.routes';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard]
  },
  ...HomeRootRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [HomeRootComponent, LoginComponent];
