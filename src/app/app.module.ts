import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule, routedComponents} from './app-routing.module';
import {ProcessbarComponent} from './shared/processbar/processbar.component';
import {OrganizationCreateComponent} from './organization/organization-create/organization-create.component';
import {OrganizationComponent} from './organization/organization.component';
import {AppComponent} from './app.component';
import {HomeRootModule} from './home-root/home-root.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './shared/services/user.service';
import {UnauthenticatedGuard} from './unauthenticated.guard';
import {provideHttpInterceptor} from './shared/interceptor/http-interceptor-provider';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HomeRootComponentGuard} from './home-root/home-root.guard';
import {NodeComponent} from './node/node.component';
import {GroupComponent} from './group/group.component';


@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    OrganizationComponent,
    OrganizationCreateComponent,
    ProcessbarComponent,
    NodeComponent,
    GroupComponent

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
