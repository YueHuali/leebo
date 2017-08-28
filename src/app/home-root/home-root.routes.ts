import {Routes} from '@angular/router';
import {HomeRootComponent} from './home-root.component';
import {HomeRootComponentGuard} from './home-root.guard';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {StorageComponent} from '../storage/storage.component';
import {StorageCreateComponent} from '../storage/storage-create/storage-create.component';
import {ClusterComponent} from '../cluster/cluster.component';
import {NodeComponent} from '../cluster/node/node.component';
import {OrganizationComponent} from '../organization/organization.component';
import { OrganizationCreateComponent } from '../organization/organization-create/organization-create.component';
import {FlavorComponent} from '../flavor/flavor.component';
import {ImageComponent} from '../image/image.component';
import {UserComponent} from '../user/user.component';
import {SignUpComponent} from '../user/user-create/sign-up.component';
import { QuotaComponent } from '../quota/quota.component';
import {SubnetComponent} from '../iaas/subnet/subnet.component';
import {FirewallComponent} from '../iaas/firewall/firewall.component';
import {FloatingIpComponent} from '../iaas/floatingIp/floatingIp.component';
import {VmComponent} from '../iaas/vm/vm.component';
import {RouterComponent} from '../iaas/router/router.component';
import {IaasStorageComponent} from '../iaas/storage/iaas-storage.component';
import {UpdatePwdComponent} from '../user/user-updatepwd/update-pwd.component';

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
      { path: 'organization/create-organization', component: OrganizationCreateComponent},
      { path: 'flavor', component: FlavorComponent},
      { path: 'quota', component: QuotaComponent},
      { path: 'image', component: ImageComponent},
      { path: 'user', component: UserComponent},
      { path: 'user/create-user', component: SignUpComponent},
      { path: 'subnet', component: SubnetComponent},
      { path: 'firewall', component: FirewallComponent},
      { path: 'floatingIp', component: FloatingIpComponent},
      { path: 'router', component: RouterComponent},
      { path: 'vm', component: VmComponent},
      { path: 'iaasStorage', component: IaasStorageComponent},
      { path: 'user/update-pwd/:name/:id', component: UpdatePwdComponent}
    ]
  }
];
