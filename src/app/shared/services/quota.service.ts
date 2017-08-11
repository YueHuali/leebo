/**
 * Created by xzhao on 2017/8/10.
 */
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import { BASE_IAAS_SERVICE } from '../oc-info';

@Injectable()
export class QuotaService {

  constructor(private http: HttpInterceptor) { }

  getAuditList(): Observable<any> {
    return this.http.get(`${BASE_IAAS_SERVICE}/quota/auditList`).map(res => res.json());
  }

  getDefault(): Observable<any> {
    return this.http.get(`${BASE_IAAS_SERVICE}/quota/project/default`).map(res => res.json());
  }

  updateDefault(quota: any) {
    return this.http.put(`${BASE_IAAS_SERVICE}/quota/project/default`, quota).map(res => res.json());
  }

  updateQuotaRecord(quotaRecord: any) {
    return this.http.put(`${BASE_IAAS_SERVICE}/quota/record`, quotaRecord).map(res => res.json())
  }
}
