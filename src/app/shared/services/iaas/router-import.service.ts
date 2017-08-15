import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BASE_IAAS_SERVICE} from '../../oc-info';
import {HttpInterceptor} from '../../interceptor/HttpInterceptor';

@Injectable()
export class RouterImportService {

  constructor(private http: HttpInterceptor) { }

  getRouters(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/routersAll');
  }

  getIaasRouters(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/routers');
  }

  importRoutersToDb(routers: any[]) {

    let body = {"routers": routers};
    console.log('importRoutersToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/importRouters', body);
  }

  removeRoutersFromDb(routerIds: any[]) {

    let body = {"routerIds": routerIds};
    console.log('removeRoutersFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/removeRouters', {body: body});
  }


}
