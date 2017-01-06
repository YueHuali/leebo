import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../interceptor/HttpInterceptor';
import {Observable} from 'rxjs';
import {BASE_OC_URI, BASE_IAAS_URI} from '../oc-info';
import {Response} from '@angular/http';

@Injectable()
export class StorageService {
  constructor(private http: HttpInterceptor) {
  }

  getStorages(): Observable<any> {
    return this.http.get(BASE_OC_URI + '/api/v1/persistentvolumes');
  }

  createStorage(name: string, size: number, type: string) {
    let url = BASE_IAAS_URI + '/standalone_shares';
    let body = {
      "tenant": {
        "user": {
          "id": "c774f0139d454df58aa20744832bb1c6",
          "name": "admin",
          "password": "qydcos"
        },
        "project": {
          "id": "64ed158db85f4d1c8c28948d1ecfcdf5",
          "name": "admin"
        }
      },
      "share": {
        "name": name,
        "size": size,
        "share_proto": type
      }
    };
    console.log('url=', url);
    console.log('body=', JSON.stringify(body));
    return this.http.post(url, body);
  }

  deleteStorage(shareId: string): Observable<Response> {

    let url = BASE_IAAS_URI + '/standalone_shares';
    let body = {
        "tenant": {
          "user": {
            "id": "c774f0139d454df58aa20744832bb1c6",
            "name": "admin",
            "password": "qydcos"
          },
          "project": {
            "id": "64ed158db85f4d1c8c28948d1ecfcdf5",
            "name": "admin"
          }
        },
        "share": {
          "share_id": shareId
        }
      };
    console.log('url=', url);
    console.log('body=', JSON.stringify(body));

    return this.http.delete(url, {
      body: body
    });
  }

}
