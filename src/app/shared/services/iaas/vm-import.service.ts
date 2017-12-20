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

  getVmZones(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/vmZones');
  }

  getIaasVmDetail( vmId: any) {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/' + vmId);
  }

  importVmsToDb(vms: any[]) {

    let body = {"vms": vms};
    console.log('importVmsToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/importVms', body);
  }

  findZoneById(id: any) {
    return this.http.get(BASE_IAAS_SERVICE+'/findById/' +id);
  }

  importZone(name: any, displayName: any) {
    let body = {"name": name, "displayName": displayName};
    return this.http.post(BASE_IAAS_SERVICE + '/importZone' ,body);
  }

  updateZone(displayName: any, name:any) {
    let body = {"name" : name, "displayName": displayName};
    console.log('removeVmsFromDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/updateZone', body);
  }

  removeVmsFromDb(vmIds: any[]) {

    let body = {"vmIds": vmIds};
    console.log('removeVmsFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/removeVms', {body: body});
  }

  removeZonesFromDb(zoneIds: any[]) {
    let body = {"zoneIds" : zoneIds};
    console.log('removeZonesFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/removeZones', {body: body});
  }

}
