/**
 * Created by yangyu on 2017年12月28日.
 */
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import {BASE_PAAS_URI} from '../oc-info';

@Injectable()
export class QuotaCheckService {

  constructor(private http: HttpInterceptor) { }

  getCheckList(): Observable<any> {
    return this.http.get(`${BASE_PAAS_URI}/quota/all` ).map(res => res.json());
  }

  updateQuotaRecord(quotaRecord: any) {
    return this.http.put(`${BASE_PAAS_URI}/quota/record`, quotaRecord).map(res => res.json());
  }

}
