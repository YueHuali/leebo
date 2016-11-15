import { Component, OnInit } from '@angular/core';
import { Deployment } from '../deployment';
import { DeploymentService } from '../../shared/services/deployment.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-deployment-info',
  templateUrl: './deployment-info.component.html',
  styleUrls: ['./deployment-info.component.scss'],
  providers: [ DeploymentService ]
})
export class DeploymentInfoComponent implements OnInit {
  deployment: Deployment;
  name: string;

  constructor(private deploymentService: DeploymentService, private ar: ActivatedRoute) { }

  ngOnInit() {
    this.ar.params.forEach((param: Params) => {
      this.name = param['name'];
      this.deployment = this.deploymentService.getDepoymentByName(this.name);
    });
  }

}
