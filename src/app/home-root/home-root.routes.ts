import {Routes} from "@angular/router";
import {HomeRootComponent} from "./home-root.component";
import {HomeRootComponentGuard} from "./home-root.guard";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {StorageComponent} from "../storage/storage.component";
import {StorageCreateComponent} from "../storage/storage-create/storage-create.component";
import {ClusterComponent} from '../cluster/cluster.component';
import {NodeComponent} from '../cluster/node/node.component';
import {OrganizationComponent} from '../organization/organization.component';
import { OrganizationCreateComponent } from '../organization/organization-create/organization-create.component';

export const HomeRootRoutes: Routes = [
  {
    path: '',
    component: HomeRootComponent,
    canActivate: [HomeRootComponentGuard],
    children: [
      { path: '', component: ClusterComponent },
      /*{ path: '', component: DashboardComponent },*/
      /*{ path: 'dashboard', component: DashboardComponent },*/
      { path: 'dashboard', component: ClusterComponent },
      { path: 'cluster', component: ClusterComponent},
      { path: 'cluster/create-node', component: NodeComponent},
      { path: 'storage', component: StorageComponent},
      { path: 'storage/create-storage', component: StorageCreateComponent},
      { path: 'organization', component: OrganizationComponent},
      { path: 'organization/create-organization', component: OrganizationCreateComponent}
    ]
  }
];
