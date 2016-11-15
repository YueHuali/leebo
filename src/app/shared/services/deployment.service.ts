import { Injectable } from '@angular/core';
import { Deployment } from '../../deployment/deployment';
import { DEPLOYMENTS } from './mock-deployment';
/**
 * Created by hexiuyu on 2016/11/15.
 */
@Injectable()
export class DeploymentService {
  getDeloyments(): Promise <Deployment[]> {
    return Promise.resolve(DEPLOYMENTS);
  }
  getDepoymentByName(name: string): Deployment {
    for (let item of DEPLOYMENTS){
      if (item.name === name) {
        return item;
      }
    }
  }
}
