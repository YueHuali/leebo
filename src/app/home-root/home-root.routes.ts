import {Routes} from '@angular/router';
import {HomeRootComponent} from './home-root.component';
import {HomeRootComponentGuard} from './home-root.guard';
import {OrganizationComponent} from '../organization/organization.component';
import {OrganizationCreateComponent} from '../organization/organization-create/organization-create.component';
import {GroupComponent} from '../sys-group/group.component';
import {NodeComponent} from '../sys-node/node.component';
import {OrgGroupComponent} from '../org-group/org-group.component';
import {OrgNodeComponent} from '../org-node/org-node.component';

export const HomeRootRoutes: Routes = [
  {
    path: '',
    component: HomeRootComponent,
    canActivate: [HomeRootComponentGuard],
    children: [
      { path: '', component: OrganizationComponent },
      { path: 'organization', component: OrganizationComponent},
      { path: 'organization/create-organization', component: OrganizationCreateComponent},
      { path: 'node', component: NodeComponent},
      { path: 'group', component: GroupComponent},
      { path: 'orgNode', component: OrgNodeComponent},
      { path: 'orgGroup', component: OrgGroupComponent},

    ]
  }
];
