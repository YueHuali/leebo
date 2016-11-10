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

import { HomeRootModule } from './home-root/home-root.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent }  from './project/project.component';
import { DeleteComponent } from './project/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    DashboardComponent,
    ProjectComponent,
    DeleteComponent
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
    {provide: 'apiBase', useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
