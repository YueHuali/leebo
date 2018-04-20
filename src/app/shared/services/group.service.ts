import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import {BASE_URI, BASE_RESMAN_URI} from '../oc-info';

@Injectable()
export class GroupService {
  constructor(private http: HttpInterceptor) {}

  getGroupList(): Observable<any> {
    return this.http.get(BASE_RESMAN_URI + '/nodeGroup/getAllNodeGroup');
  }

  createGroup(newGroup: any) {
    const objUrl = BASE_RESMAN_URI + '/nodeGroup/';
    console.log('objUrl=', objUrl);

    const body = {
      'name': newGroup.name
    };
    console.log('body=', body);
    return this.http.post(objUrl, body);
  }

  deleteGroup(uuid: string) {
    const objUrl = BASE_RESMAN_URI + '/nodeGroup/deleteNodeGroup/' + uuid;
    console.log('objUrl=', objUrl);
    return this.http.delete(objUrl);
  }

  assignGroup(groupUuid: any, orgUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/nodeGroup/assignNodeGroupToOrg/' + groupUuid + "/" + orgUuid;
    console.log('objUrl=', objUrl);

    return this.http.get(objUrl);
  }

  reclaimGroup(groupUuid: any, orgUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/nodeGroup/removeNodeGroupFromOrg/' + groupUuid + "/" + orgUuid;
    console.log('objUrl=', objUrl);

    return this.http.delete(objUrl);
  }

}
