import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { UserService } from './shared/services/user.service';
import { HomeRootComponentGuard } from './home-root/home-root.guard';
import { UnauthenticatedGuard } from './unauthenticated.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { ProjectComponent }  from './project/project.component';
import {MonitorComponent} from "./monitor/monitor.component";
import {DeleteComponent} from "./project/delete/delete.component";
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { CliComponent } from './console/cli/cli.component';
import {ConsoleComponent} from './console/console.component';
import { MonitorInfoComponent } from './monitor/monitor-info/monitor-info.component';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    DashboardComponent,
    ProjectComponent,
    DeleteComponent,
    ProjectDetailComponent,
    ConsoleComponent,
    CliComponent,
    MonitorComponent,
    MonitorInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [
    UserService,
    HomeRootComponentGuard,
    UnauthenticatedGuard,
    {provide: 'apiBase', useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
