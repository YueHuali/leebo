import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { UserService } from './shared/services/user.service';
import { HomeRootComponentGuard } from './home-root/home-root.guard';
import { UnauthenticatedGuard } from './unauthenticated.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeRootModule } from './home-root/home-root.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { MonitorComponent } from './monitor/monitor.component';
import { DeleteComponent } from './project/delete/delete.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { CliComponent } from './console/cli/cli.component';
import { ConsoleComponent } from './console/console.component';
import { MonitorInfoComponent } from './monitor/monitor-info/monitor-info.component';
import { RouteComponent } from './route/route.component';
import { RouteCreateComponent } from './route/route-create/route-create.component';
import { ApplicationServiceComponent } from './application-service/application-service.component';
import { RouteInfoComponent } from './route/route-info/route-info.component';
import { ApplicationServiceDetailComponent } from './application-service/application-service-detail/application-service-detail.component';
import { CiCdComponent } from './ci-cd/ci-cd.component';
import { ResourcesQuotaComponent } from './resources-quota/resources-quota.component';
import { TemplateInfoComponent } from './ci-cd/template-info/template-info.component';
import { ServiceCreateComponent } from './ci-cd/service-create/service-create.component';
import { provideHttpInterceptor } from './shared/interceptor/http-interceptor-provider';
import { ServiceGroupComponent } from './dashboard/overview-service-group/overview-service-group.component';
import { OverviewServiceComponent } from './dashboard/overview-service/overview-service.component';
import { DeploymentComponent } from './deployment/deployment.component';
import { DeploymentInfoComponent } from './deployment/deployment-info/deployment-info.component';
import { StorageComponent } from './storage/storage.component';
import { StorageCreateComponent } from './storage/storage-create/storage-create.component';
import { PodComponent } from './pod/pod.component';
import { PodInfoComponent } from './pod/pod-info/pod-info.component';
import { BuildsComponent } from './builds/builds.component';
import { BuildsDetailComponent } from './builds/builds-detail/builds-detail.component';
import { ImagesComponent } from './images/images.component';
import { ImagesDetailComponent } from './images/images-detail/images-detail.component';

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
    MonitorInfoComponent,
    RouteComponent,
    RouteCreateComponent,
    ApplicationServiceComponent,
    RouteInfoComponent,
    ApplicationServiceDetailComponent,
    CiCdComponent,
    TemplateInfoComponent,
    ServiceCreateComponent,
    ResourcesQuotaComponent,
    ServiceGroupComponent,
    OverviewServiceComponent,
    DeploymentComponent,
    DeploymentInfoComponent,
    StorageComponent,
    StorageCreateComponent,
    PodComponent,
    PodInfoComponent
    ResourcesQuotaComponent,
    BuildsComponent,
    BuildsDetailComponent,
    ImagesComponent,
    ImagesDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeRootModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [
    UserService,
    HomeRootComponentGuard,
    UnauthenticatedGuard,
    {provide: 'apiBase', useValue: '/'},
    provideHttpInterceptor()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
