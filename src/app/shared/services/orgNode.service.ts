import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import {BASE_URI, BASE_RESMAN_URI} from '../oc-info';

@Injectable()
export class OrgNodeService {
  constructor(private http: HttpInterceptor) {}

  getOrgNodeList(currentOrgId: any): Observable<any> {
    return this.http.get(BASE_RESMAN_URI + '/orgNode/getAllOrgNode/' +　currentOrgId);
  }

  addOrgNodeToOrgGroup(nodeUuid: any, groupUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/orgNode/addOrgNodeToOrgGroup/' + nodeUuid + "/" + groupUuid;
    console.log('objUrl=', objUrl);

    return this.http.get(objUrl);
  }

  removeOrgNodeFromOrgGroup(nodeUuid: any, groupUuid: any) {
    const objUrl = BASE_RESMAN_URI + '/orgNode/removeOrgNodeFromOrgGroup/' + nodeUuid + "/" + groupUuid;
    console.log('objUrl=', objUrl);

    return this.http.delete(objUrl);
  }

}
