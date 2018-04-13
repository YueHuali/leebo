import {Routes} from '@angular/router';
import {HomeRootComponent} from './home-root.component';
import {HomeRootComponentGuard} from './home-root.guard';
import {OrganizationComponent} from '../organization/organization.component';
import {OrganizationCreateComponent} from '../organization/organization-create/organization-create.component';
export const HomeRootRoutes: Routes = [
  {
    path: '',
    component: HomeRootComponent,
    canActivate: [HomeRootComponentGuard],
    children: [
      { path: '', component: OrganizationComponent },
      { path: 'organization', component: OrganizationComponent},
      { path: 'organization/create-organization', component: OrganizationCreateComponent}

    ]
  }
];
