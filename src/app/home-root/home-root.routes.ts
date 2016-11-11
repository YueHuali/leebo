import { Routes } from '@angular/router';

import { HomeRootComponent } from './home-root.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectComponent } from '../project/project.component';
import { HomeRootComponentGuard } from './home-root.guard';
import {ProjectDetailComponent} from "../project/project-detail/project-detail.component";
import { ConsoleComponent } from '../console/console.component';
import { CliComponent } from '../console/cli/cli.component';
import { MonitorComponent } from "../monitor/monitor.component";
import {ApplicationServiceComponent} from '../application-service/application-service.component';

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
      { path: 'monitor', component: MonitorComponent},
      { path: 'services', component: ApplicationServiceComponent}
    ]
  }
];
