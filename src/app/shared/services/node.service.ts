import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import {BASE_URI, BASE_RESMAN_URI} from '../oc-info';

@Injectable()
export class NodeService {
  constructor(private http: HttpInterceptor) {}

  getNodeList(): Observable<any> {
    return this.http.get(BASE_RESMAN_URI + '/sys-node/getAllNode');
  }

  createNode(newNode: any) {
    const objUrl = BASE_RESMAN_URI + '/sys-node/';
    console.log('objUrl=', objUrl);

    const body = {
      'name': newNode.name,
      'ip': newNode.ip
    };
    console.log('body=', body);
    return this.http.post(objUrl, body);
  }

  deleteNode(uuid: string) {
    const objUrl = BASE_RESMAN_URI + '/sys-node/deleteNode/' + uuid;
    console.log('objUrl=', objUrl);
    return this.http.delete(objUrl);
  }

  assignNode(nodeUuid: any, orgUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/sys-node/assignNodeToOrg/' + nodeUuid + "/" + orgUuid;
    console.log('objUrl=', objUrl);

    return this.http.get(objUrl);
  }

  reclaimNode(nodeUuid: any, orgUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/sys-node/removeNodeFromOrg/' + nodeUuid + "/" + orgUuid;
    console.log('objUrl=', objUrl);

    return this.http.delete(objUrl);
  }

  deployNode(nodeUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/sys-node/deployNode/' + nodeUuid;
    console.log('objUrl=', objUrl);

    return this.http.get(objUrl);
  }

  addNodeToGroup(nodeUuid: any, groupUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/sys-node/addNodeToGroup/' + nodeUuid + "/" + groupUuid;
    console.log('objUrl=', objUrl);

    return this.http.get(objUrl);
  }

  removeNodeFromGroup(nodeUuid: any, groupUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/sys-node/removeNodeFromGroup/' + nodeUuid + "/" + groupUuid;
    console.log('objUrl=', objUrl);

    return this.http.delete(objUrl);
  }

  assignNodeToOrg(nodeUuid: any, orgUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/sys-node/assignNode/' + nodeUuid + "/" + orgUuid;
    console.log('objUrl=', objUrl);

    return this.http.get(objUrl);
  }

  reclaimNodeFromOrg(nodeUuid: any, orgUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/sys-node/reclaimNode/' + nodeUuid + "/" + orgUuid;
    console.log('objUrl=', objUrl);

    return this.http.delete(objUrl);
  }

}
