import { Component, OnInit } from '@angular/core';
import {ApplicationServiceService} from '../../shared/services/applicationService.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ApplicationService} from '../../shared/services/applicationService';

@Component({
  selector: 'app-application-service-detail',
  templateUrl: './application-service-detail.component.html',
  styleUrls: ['./application-service-detail.component.scss'],
  providers: [ ApplicationServiceService ]
})
export class ApplicationServiceDetailComponent implements OnInit {

  appService: ApplicationService;
  name: string;
  constructor(private appServiceService: ApplicationServiceService, private ar: ActivatedRoute) {
  }
  ngOnInit() {
    this.ar.params.forEach((param: Params) => {
      this.name = param['name'];
      this.appService = this.appServiceService.findByName(this.name);
    });
  }
}
