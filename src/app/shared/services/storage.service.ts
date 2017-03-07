import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../interceptor/HttpInterceptor';
import {Observable} from 'rxjs';
import { BASE_OC_URI, BASE_IAAS_URI, IaaS_USER_ID, IaaS_PROJECT_ID } from '../oc-info';
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

  createPV(name: string, size: number, shareId: string, export_locations: string) {
    let addrArr = export_locations.split(':');
    let ip = addrArr[0];
    let path = addrArr[1];

    let url = BASE_OC_URI + '/api/v1/persistentvolumes';
    let body = {
      "kind": "PersistentVolume",
      "apiVersion": "v1",
      "metadata": {
        "name": name,
        "creationTimestamp": null,
        "labels":{
            "shareId": shareId,
            "vendor":"qingyuan"
        }
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
    let url = BASE_OC_URI + '/api/v1/persistentvolumes/' + name;
    console.log('url=', url);
    /*this.getStorageByName(name).subscribe(
      (res: Response) => {
        console.log("body=" + res['_body']);
        this.http.delete(url, JSON.parse(res['_body'])).subscribe();
      });*/
    this.http.delete(url).subscribe();
  }


  createStorage(name: string, size: number, type: string) {
    let url = BASE_IAAS_URI + '/standalone_shares';
    let body = {
      "tenant": {
        "user": {
          "id": IaaS_USER_ID,
          "name": "admin",
          "password": "qydcos"
        },
        "project": {
          "id": IaaS_PROJECT_ID,
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
          "id": IaaS_USER_ID,
          "name": "admin",
          "password": "qydcos"
        },
        "project": {
          "id": IaaS_PROJECT_ID,
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
