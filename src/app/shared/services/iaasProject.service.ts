/**
 * Created by xzhao on 2017/8/10.
 */

import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import { BASE_IAAS_SERVICE } from '../oc-info';
@Injectable()
export class IaasProjectService {

  constructor(private http: HttpInterceptor) { }

  getProjectNameByUuid(uuid: string): any {
    return this.http.get(`${BASE_IAAS_SERVICE}/quota/project/${uuid}`).map(res => res.json());
  }
}
