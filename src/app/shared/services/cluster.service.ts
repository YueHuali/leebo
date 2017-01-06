import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import {BASE_OC_URI, BASE_IAAS_URI, BASE_TASK_URI} from '../oc-info';
import {Response} from '@angular/http';
/**
 * Created by victor on 2016/12/29.
 */
@Injectable()
export class ClusterService {
  constructor(private http: HttpInterceptor) {}

  getNodes(): Observable<any> {
    return this.http.get(BASE_OC_URI + '/api/v1/nodes');
  }

  createNode(name: string, host: string) {
    let url = BASE_IAAS_URI + '/clusters/ocnode';
    let body = {
      "cluster": {
        "ansible_ssh_user": "root",
        "ansible_ssh_pass": "qydcos",
        "openshift_master_portal_net": "172.30.0.0/16",
        "osm_cluster_network_cidr": "10.128.0.0/14",
        "osm_host_subnet_length": 9,
        "openshift_master_default_subdomain": "cloudapp.qydcos.com",
        "openshift_master_cluster_hostname": "172.28.90.21",
        "openshift_master_cluster_public_hostname": "192.168.1.168",
        "masters": [
          {
            "name": "oc-master-1",
            "host": "192.168.1.168"
          }
        ],
        "nodes": [
          {
            "name": name,
            "host": host,
            "labels": {
              "qy_role": "worker",
              "qy_name": name,
              "qy_external_ip": host
            }
          }
        ]
      }
    };
    console.log('url=', url);
    console.log('body=', JSON.stringify(body));
    return this.http.post(url, body);
  }

  deleteNode(name: string, host: string, ip: string) {
    let url = BASE_IAAS_URI + '/clusters/ocnode';
    let body = {
      "cluster": {
        "ansible_ssh_user": "root",
        "ansible_ssh_pass": "qydcos",
        "masters": [
          {
            "name": "oc-master-1",
            "host": "192.168.1.168"
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
    };
    console.log('url=', url);
    console.log('body=', JSON.stringify(body));

    return this.http.delete(url, {
      body: body
    });
  }

  checkProcess(res: Response): Observable<any> {
    let taskJson = JSON.parse(res['_body']);
    console.log('response task:'+JSON.stringify(taskJson));
    console.log('response task id:'+taskJson['task']['id']);

    let taskUrl = BASE_TASK_URI.replace('taskId', taskJson['task']['id']);
    console.log('taskUrl=', taskUrl);

    return this.http.get(taskUrl);
  }
}
