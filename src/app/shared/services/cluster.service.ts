import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import {BASE_IAAS_URI} from '../oc-info';
/**
 * Created by victor on 2016/12/29.
 */
@Injectable()
export class ClusterService {
  constructor(private http: HttpInterceptor) {}

  createNode(name: string, host: string): Observable<any> {
    let body = {
      "cluster": {
        "openshift_master_portal_net": "172.30.0.0/16",
        "osm_cluster_network_cidr": "10.128.0.0/14",
        "osm_host_subnet_length": 9,
        "openshift_master_default_subdomain": "qyos3.com",
        "openshift_master_cluster_hostname": "192.168.88.7",
        "openshift_master_cluster_public_hostname": "192.168.1.190",
        "masters": [
          {
            "name": "oc-master-1",
            "host": "192.168.1.191"
          },
          {
            "name": "oc-master-2",
            "host": "192.168.1.192"
          },
          {
            "name": "oc-master-3",
            "host": "192.168.1.193"
          }
        ],
        "nodes": [
          {
            "name": name,
            "host": host
          }
        ]
      }
    }
    return this.http.post(BASE_IAAS_URI + '/clusters/ocnode/', body);
  }

  deleteNode(name: string, host: string, ip: string): Observable<any> {
    let body = {
      "cluster": {

        "masters": [
          {
            "name": "oc-master-1",
            "host": "192.168.1.191"
          }
        ],
        "nodes": [
          {
            "name": name,
            "host": host,
            "ip": ip
          }
        ]
      }
    }
    return this.http.delete(BASE_IAAS_URI + '/clusters/ocnode/', body);
  }
}
