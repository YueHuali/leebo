import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BASE_IAAS_SERVICE} from '../../oc-info';
import {HttpInterceptor} from '../../interceptor/HttpInterceptor';

@Injectable()
export class FloatingIpImportService {

  constructor(private http: HttpInterceptor) { }

  getFloatingIps(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/floatingips/floatingIPsAll');
  }

  getIaasFloatingIps(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/floatingips');
  }

  importFloatingIpsToDb(floatingIPs: any[]) {

    let body = {"floatingIPs": floatingIPs};
    console.log('importFloatingIpsToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/floatingips/importFloatingIPs', body);
  }

  removeFloatingIpsFromDb(floatingIpIds: any[]) {

    let body = {"floatingIPIds": floatingIpIds};
    console.log('removeFloatingIpsFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/floatingips/removeFloatingIPs', {body: body});
  }


}
