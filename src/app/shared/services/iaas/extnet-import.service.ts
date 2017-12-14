import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BASE_IAAS_SERVICE} from '../../oc-info';
import {HttpInterceptor} from '../../interceptor/HttpInterceptor';

@Injectable()
export class ExtnetImportService {

  constructor(private http: HttpInterceptor) { }

  getExtnet(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/extnets');
  }

  createExtnetToDb(extnet: any[]) {

    let body =extnet;
    console.log('addExtnetToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/createExtnet', body);
  }

  removeExtnetFromDb(extnetUUIDs: any[]) {

    let body = {"extnetUUID": extnetUUIDs};
    console.log('removeExtnetFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/removeExtnets', {body: body});
  }


}
