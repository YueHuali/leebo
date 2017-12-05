import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BASE_IAAS_SERVICE} from '../../oc-info';
import {HttpInterceptor} from '../../interceptor/HttpInterceptor';

@Injectable()
export class StorageImportService {

  constructor(private http: HttpInterceptor) { }

  getStorages(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/storagesAll');
  }

  getIaasStorages(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/storages');
  }

  importStoragesToDb(storages: any[]) {

    let body = {"storages": storages};
    console.log('importStoragesToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/importStorages', body);
  }

  removeStoragesFromDb(storageIds: any[]) {

    let body = {"storageIds": storageIds};
    console.log('removeStoragesFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/removeStorages', {body: body});
  }

  getAllStorageByAdmin() {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/storages' );
  }


}
