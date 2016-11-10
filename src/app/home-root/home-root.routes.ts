import { Routes } from '@angular/router';

import { HomeRootComponent } from './home-root.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectComponent } from '../project/project.component';
import { HomeRootComponentGuard } from './home-root.guard';
import {ProjectDetailComponent} from "../project/project-detail/project-detail.component";
import { ConsoleComponent } from '../console/console.component';
import { CliComponent } from '../console/cli/cli.component';
import { MonitorComponent } from "../monitor/monitor.component";

export const HomeRootRoutes: Routes = [
  {
    path: '',
    component: HomeRootComponent,
    canActivate: [HomeRootComponentGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'project/detail',component: ProjectDetailComponent},
      { path: 'console', component: ConsoleComponent },
      { path: 'cli', component: CliComponent },
      { path: 'monitor', component: MonitorComponent}
    ]
  }
];
