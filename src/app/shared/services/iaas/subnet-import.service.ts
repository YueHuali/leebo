import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BASE_IAAS_SERVICE} from '../../oc-info';
import {HttpInterceptor} from '../../interceptor/HttpInterceptor';

@Injectable()
export class SubnetImportService {

  constructor(private http: HttpInterceptor) { }

  getSubnets(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/subnetsAll');
  }

  getIaasSubnets(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/subnets');
  }

  importSubnetsToDb(subnets: any[]) {

    let body = {"subnets": subnets};
    console.log('importSubnetsToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/importSubnets', body);
  }

  removeSubnetsFromDb(subnetIds: any[]) {

    let body = {"subnetIds": subnetIds};
    console.log('removeSubnetsFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/removeSubnets', {body: body});
  }


}
