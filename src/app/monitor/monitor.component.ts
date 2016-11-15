import { Component, OnInit } from '@angular/core';
import {MonitorService} from '../shared/services/monitor.service';
import {BuildMonitor} from './build-monitor';
import {DeploymentMonitor} from './deployment-monitor';
import {PodMonitor} from './pod-monitor';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
  providers: [MonitorService]
})
export class MonitorComponent implements OnInit {

  target: string;
  selectType: string;
  buildMonitors: BuildMonitor[] = [];
  deploymentMonitors: DeploymentMonitor[] = [];
  podMonitors: PodMonitor[] = [];

  constructor(private monitorService: MonitorService) {
    this.target = 'target1';
    this.selectType = 'All';
  }

  toggle(id: string): void {

  }
  ngOnInit() {
    this.buildMonitors = this.monitorService.getBuildMonitors();
    this.deploymentMonitors = this.monitorService.getDeploymentMonitors();
    this.podMonitors = this.monitorService.getPodMonitors();
  }

}
