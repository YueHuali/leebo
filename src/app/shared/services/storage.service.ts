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

  getStorageByName(name: string): Observable<any> {
    return this.http.get(BASE_OC_URI + '/api/v1/persistentvolumes/' + name);
  }

  createPV(name: string, size: number, export_locations: string) {
    let addrArr = export_locations.split(':');
    let ip = addrArr[0];
    let path = addrArr[1];

    let url = BASE_OC_URI + '/api/v1/persistentvolumes';
    let body = {
      "kind": "PersistentVolume",
      "apiVersion": "v1",
      "metadata": {
        "name": name,
        "creationTimestamp": null
      },
      "spec": {
        "capacity": {
          "storage": size + "Gi"
        },
        "nfs": {
          "server": ip,
          "path": path
        },
        "accessModes": [
          "ReadWriteMany"
        ],
        "persistentVolumeReclaimPolicy": "Recycle"
      },
      "status": {
        "phase": "Pending"
      }
    };
    console.log('url=', url);
    console.log('body=', JSON.stringify(body));
    return this.http.post(url, body).subscribe();

  }

  deletePV(name: string) {
    let url = BASE_OC_URI + '/api/v1/persistentvolumes';
    console.log('url=', url);
    this.getStorageByName(name).subscribe(
      (res: Response) => {
        console.log("body=" + res['_body']);
        this.http.delete(url, JSON.parse(res['_body'])).subscribe();
      });

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
