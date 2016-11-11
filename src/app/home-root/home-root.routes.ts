

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
export const HomeRootRoutes: Routes = [
  {
    path: '',
    component: HomeRootComponent,
    canActivate: [HomeRootComponentGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'project/detail', component: ProjectDetailComponent},
      { path: 'console', component: ConsoleComponent },
      { path: 'cli', component: CliComponent },
      { path: 'monitor', component: MonitorComponent},
      { path: 'route', component: RouteComponent},
      { path: 'route/create-route', component: RouteCreateComponent}
    ]
  }
];
