import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BASE_IAAS_SERVICE} from '../../oc-info';
import {HttpInterceptor} from '../../interceptor/HttpInterceptor';

@Injectable()
export class VmImportService {

  constructor(private http: HttpInterceptor) { }

  getVms(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/vmsAll');
  }

  getIaasVms(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/vms');
  }

  getIaasVmDetail( vmId: any) {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/' + vmId);
  }

  importVmsToDb(vms: any[]) {

    let body = {"vms": vms};
    console.log('importVmsToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/importVms', body);
  }

  removeVmsFromDb(vmIds: any[]) {

    let body = {"vmIds": vmIds};
    console.log('removeVmsFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/removeVms', {body: body});
  }


}
