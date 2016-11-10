import {BuildMonitor} from "../../monitor/build-monitor";
import {DeploymentMonitor} from "../../monitor/deployment-monitor";
import {PodMonitor} from "../../monitor/pod-monitor"
export const BUILDMONITORS:BuildMonitor[] = [
  {name:"build1", creat_time:"2016.10.22.14:20",status:"success", info:"Merge pull request ",console:"console1"},
  {name:"build2", creat_time:"2016.10.22.14:20",status:"failed", info:"info info info  ",console:"console1"},
]

export const DEPLOYMENTMONITORS:DeploymentMonitor[] = [
  {name:"deployment1", creat_time:"2016.10.22.14:20",status:"success", info:"Merge pull request ",console:"console1"},
  {name:"deployment2", creat_time:"2016.10.22.14:20",status:"failed", info:"info info info  ",console:"console1"},
  {name:"deployment3", creat_time:"2016.10.22.14:20",status:"failed", info:"info info info  ",console:"console1"},
]

export const PODSMONITORS:PodMonitor[]=[
  {name:"pods1", creat_time:"2016.10.22.14:20",status:"success", info:"Merge pull request ",console:"console1"}
]
