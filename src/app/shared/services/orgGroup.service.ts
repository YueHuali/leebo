import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import {BASE_URI, BASE_RESMAN_URI} from '../oc-info';

@Injectable()
export class OrgGroupService {
  constructor(private http: HttpInterceptor) {}

  getOrgGroupList(): Observable<any> {
    return this.http.get(BASE_RESMAN_URI + '/orgGroup/getAllOrgGroup/');
  }

  createOrgGroup(newOrgGroup: any, currentOrgId: any) {
    const objUrl = BASE_RESMAN_URI + '/orgGroup/';
    console.log('objUrl=', objUrl);

    const body = {
      'name': newOrgGroup.name,
      'orgId': currentOrgId
    };
    console.log('body=', body);
    return this.http.post(objUrl, body);
  }

  deleteOrgGroup(uuid: string) {
    const objUrl = BASE_RESMAN_URI + '/orgGroup/deleteOrgGroup/' + uuid;
    console.log('objUrl=', objUrl);
    return this.http.delete(objUrl);
  }



}
