import {Routes} from "@angular/router";
import {HomeRootComponent} from "./home-root.component";
import {HomeRootComponentGuard} from "./home-root.guard";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ProjectComponent} from "../project/project.component";
import {ProjectDetailComponent} from "../project/project-detail/project-detail.component";
import {ConsoleComponent} from "../console/console.component";
import {CliComponent} from "../console/cli/cli.component";
import {MonitorComponent} from "../monitor/monitor.component";
import {RouteComponent} from "../route/route.component";
import {RouteCreateComponent} from "../route/route-create/route-create.component";
import {ApplicationServiceComponent} from '../application-service/application-service.component';
import { RouteInfoComponent } from '../route/route-info/route-info.component';
import {ApplicationServiceDetailComponent} from '../application-service/application-service-detail/application-service-detail.component';
import { CiCdComponent } from '../ci-cd/ci-cd.component';
import { ResourcesQuotaComponent } from '../resources-quota/resources-quota.component';
import {ServiceCreateComponent} from '../ci-cd/service-create/service-create.component';
import { DeploymentComponent } from '../deployment/deployment.component';
import { DeploymentInfoComponent } from '../deployment/deployment-info/deployment-info.component';
import {StorageComponent} from "../storage/storage.component";
import {StorageCreateComponent} from "../storage/storage-create/storage-create.component";
import { PodComponent } from '../pod/pod.component';
import { PodInfoComponent } from '../pod/pod-info/pod-info.component';
import { BuildsComponent } from '../builds/builds.component';
import { BuildsDetailComponent } from '../builds/builds-detail/builds-detail.component';
import { ImagesComponent } from '../images/images.component';
import { ImagesDetailComponent } from '../images/images-detail/images-detail.component';

export const HomeRootRoutes: Routes = [
  {
    path: '',
    component: HomeRootComponent,
    canActivate: [HomeRootComponentGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'project/create-project', component: ProjectDetailComponent},
      { path: 'project/:name/edit', component: ProjectDetailComponent},
      { path: 'console', component: ConsoleComponent },
      { path: 'cli', component: CliComponent },
      { path: 'cicd', component: CiCdComponent },
      { path: 'serviceCreate', component: ServiceCreateComponent },
      { path: 'monitor', component: MonitorComponent},
      { path: 'route', component: RouteComponent},
      { path: 'route/create-route', component: RouteCreateComponent},
      { path: 'services', component: ApplicationServiceComponent},
      { path: 'route/:name', component: RouteInfoComponent},
      { path: 'services/:name', component: ApplicationServiceDetailComponent},
      { path: 'quota', component: ResourcesQuotaComponent},
      { path: 'deployment', component: DeploymentComponent},
      { path: 'deployment/:name', component: DeploymentInfoComponent},
      { path: 'storage', component: StorageComponent},
      { path: 'storage/create-storage', component: StorageCreateComponent},
      { path: 'pod', component: PodComponent},
      { path: 'pod/:name', component: PodInfoComponent},
      { path: 'quota', component: ResourcesQuotaComponent},
      { path: 'builds', component: BuildsComponent},
      { path: 'builds/:name', component: BuildsDetailComponent},
      { path: 'images', component: ImagesComponent},
      { path: 'images/:name', component: ImagesDetailComponent}
    ]
  }
];
