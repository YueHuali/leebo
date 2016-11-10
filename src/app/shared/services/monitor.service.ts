import {Injectable} from "@angular/core";
import {BuildMonitor} from "../../monitor/build-monitor";
import {DeploymentMonitor} from "../../monitor/deployment-monitor";
import {PodMonitor} from "../../monitor/pod-monitor";
import {BUILDMONITORS, DEPLOYMENTMONITORS, PODSMONITORS} from "./mock-monitor";

@Injectable()
export class MonitorService {

  constructor() { }

  getBuildMonitors():BuildMonitor[]{
    return BUILDMONITORS;
  }
  getDeploymentMonitors():DeploymentMonitor[]{
    return DEPLOYMENTMONITORS;
  }

  getPodMonitors():PodMonitor[]{
    return PODSMONITORS;
  }

}
