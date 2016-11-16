import { Component, OnInit } from '@angular/core';
import { Deployment } from './deployment';
import { DeploymentService } from '../shared/services/deployment.service';

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.component.html',
  styleUrls: ['./deployment.component.scss'],
  providers: [ DeploymentService ]
})
export class DeploymentComponent implements OnInit {
  deployments: Deployment[];

  constructor(private deploymentService: DeploymentService) { }

  ngOnInit() {
    this.deploymentService.getDeloyments().then(deployments => this.deployments = deployments );
  }

}
