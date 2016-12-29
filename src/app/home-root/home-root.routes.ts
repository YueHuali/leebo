import {Routes} from "@angular/router";
import {HomeRootComponent} from "./home-root.component";
import {HomeRootComponentGuard} from "./home-root.guard";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {StorageComponent} from "../storage/storage.component";
import {StorageCreateComponent} from "../storage/storage-create/storage-create.component";
import {ClusterComponent} from '../cluster/cluster.component';


export const HomeRootRoutes: Routes = [
  {
    path: '',
    component: HomeRootComponent,
    canActivate: [HomeRootComponentGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cluster', component: ClusterComponent},
      { path: 'storage', component: StorageComponent},
      { path: 'storage/create-storage', component: StorageCreateComponent},

    ]
  }
];
