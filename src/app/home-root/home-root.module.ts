import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TopNavComponent } from '../shared/topnav/index';
import { SidebarComponent } from '../shared/sidebar/index';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  declarations: [
    TopNavComponent,
    SidebarComponent
  ],
  exports: [
    TopNavComponent,
    SidebarComponent
  ]
})

export class HomeRootModule { }
