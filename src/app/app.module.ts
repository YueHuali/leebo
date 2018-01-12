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
import { VolumeTypeComponent } from './iaas/volumeType/volumeType.component';
import { VolumeTypeCreateComponent } from './iaas/volumeType/volumeType-create/volumeType-create.component';
import { ClusterComponent } from './cluster/cluster.component';
import { NodeComponent } from './cluster/node/node.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationCreateComponent } from './organization/organization-create/organization-create.component';
import { ProcessbarComponent } from './shared/processbar/processbar.component';
import { FlavorComponent } from './flavor/flavor.component';
import { ImageComponent } from './image/image.component';
import { ImportImageComponent } from './image/import-image/import-image.component';
import { ImportFlavorComponent } from './flavor/import-flavor/import-flavor.component';
import { DisplayFlavorComponent } from './flavor/display-flavor/display-flavor.component';
import {UserComponent} from './user/user.component';
import {SignUpComponent} from './user/user-create/sign-up.component';
import {QuotaComponent} from './quota/quota.component';
import {QuotaStatus} from './shared/pipe/quotaStatus.pipe';
import {ProjectNameComponent} from './quota/project-name/project-name.component';
import {IaasStatusPipe} from './shared/pipe/iaas-status.pipe';
import {ImportSubnetComponent} from './iaas/subnet/import-subnet/import-subnet.component';
import {SubnetComponent} from './iaas/subnet/subnet.component';
import {FirewallComponent} from './iaas/firewall/firewall.component';
import {ImportFirewallComponent} from './iaas/firewall/import-firewall/import-firewall.component';
import {ImportFloatingIpComponent} from './iaas/floatingIp/import-floatingIp/import-floatingIp.component';
import {FloatingIpComponent} from './iaas/floatingIp/floatingIp.component';
import {ImportExtnetComponent} from './iaas/extnet/import-extnet/import-extnet.component';
import {ExtnetComponent} from './iaas/extnet/extnet.component';
import {VmComponent} from './iaas/vm/vm.component';
import {ImportVmComponent} from './iaas/vm/import-vm/import-vm.component';
import {RouterComponent} from './iaas/router/router.component';
import {ImportRouterComponent} from './iaas/router/import-router/import-router.component';
import {IaasStorageComponent} from './iaas/storage/iaas-storage.component';
import {ImportIaasStorageComponent} from './iaas/storage/import-storage/import-iaas-storage.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {UpdatePwdComponent} from './user/user-updatepwd/update-pwd.component';
import {ZoneComponent} from "./iaas/zone/zone.component";
import {ImportZoneComponent} from "./iaas/zone/import-zone/import-zone.component"

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    DashboardComponent,
    ServiceGroupComponent,
    OverviewServiceComponent,
    StorageComponent,
    StorageCreateComponent,
    VolumeTypeComponent,
    VolumeTypeCreateComponent,
    ClusterComponent,
    NodeComponent,
    OrganizationComponent,
    OrganizationCreateComponent,
    ProcessbarComponent,
    FlavorComponent,
    ZoneComponent,
    ImportZoneComponent,
    ImageComponent,
    ImportImageComponent,
    ImportFlavorComponent,
    DisplayFlavorComponent,
    UserComponent,
    SignUpComponent,
    QuotaComponent,
    QuotaStatus,
    ProjectNameComponent,
    SubnetComponent,
    ImportSubnetComponent,
    IaasStatusPipe,
    FirewallComponent,
    ImportFirewallComponent,
    FloatingIpComponent,
    ExtnetComponent,
    ImportFloatingIpComponent,
    ImportExtnetComponent,
    VmComponent,
    ImportVmComponent,
    RouterComponent,
    ImportRouterComponent,
    IaasStorageComponent,
    ImportIaasStorageComponent,
    UpdatePwdComponent
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
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideHttpInterceptor()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
