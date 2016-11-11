import { Component, OnInit } from '@angular/core';
import { ApplicationServiceService } from '../shared/services/applicationService.service';
import {ApplicationService} from '../shared/services/applicationService';

@Component({
  selector: 'app-application-service',
  templateUrl: './application-service.component.html',
  styleUrls: ['./application-service.component.scss'],
  providers: [ ApplicationServiceService ]
})
export class ApplicationServiceComponent implements OnInit {

  appServices: ApplicationService[] ;
  constructor(private appServiceService: ApplicationServiceService) {}

  ngOnInit() {
    this.appServiceService.getApplicationServices().then(appsers => this.appServices = appsers);
  }

  filterByLabel(): void {
    alert('add');
  }
}
