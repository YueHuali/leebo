import { Injectable } from '@angular/core';
import {BuildMonitor} from "../../monitor/build-monitor";
import {DeploymentMonitor} from "../../monitor/deployment-monitor";
import {PodMonitor} from "../../monitor/pod-monitor";

@Injectable()
export class MonitorService {

  constructor() { }

  getBuildMonitors():Promise<BuildMonitor[]>{

  }
  getDeploymentMonitors():Promise<DeploymentMonitor[]>{

  }

  getPodMonitors():Promise<PodMonitor[]>{

  }

}
