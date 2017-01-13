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
import { provideHttpInterceptor } from './shared/interceptor/http-interceptor-provider';
import { ServiceGroupComponent } from './dashboard/overview-service-group/overview-service-group.component';
import { OverviewServiceComponent } from './dashboard/overview-service/overview-service.component';
import { StorageComponent } from './storage/storage.component';
import { StorageCreateComponent } from './storage/storage-create/storage-create.component';
import { ClusterComponent } from './cluster/cluster.component';
import { NodeComponent } from './cluster/node/node.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationCreateComponent } from './organization/organization-create/organization-create.component';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    DashboardComponent,
    ServiceGroupComponent,
    OverviewServiceComponent,
    StorageComponent,
    StorageCreateComponent,
    ClusterComponent,
    NodeComponent,
    OrganizationComponent,
    OrganizationCreateComponent
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
