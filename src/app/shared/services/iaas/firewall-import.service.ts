import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BASE_IAAS_SERVICE} from '../../oc-info';
import {HttpInterceptor} from '../../interceptor/HttpInterceptor';

@Injectable()
export class FirewallImportService {

  constructor(private http: HttpInterceptor) { }

  getFirewalls(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/firewallsAll');
  }

  getIaasFirewalls(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/firewalls');
  }

  importFirewallsToDb(firewalls: any[]) {

    let body = {"firewalls": firewalls};
    console.log('importFirewallsToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/importFirewalls', body);
  }

  removeFirewallsFromDb(firewallIds: any[]) {

    let body = {"firewallIds": firewallIds};
    console.log('removeFirewallsFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/removeFirewalls', {body: body});
  }


}
