import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import { BASE_URI } from '../oc-info';
/**
 * Created by xzhao on 2017/2/23.
 */
@Injectable()
export class GroupService {
  constructor(private http: HttpInterceptor) {}

  getGroupByName(groupName: string): Observable<any> {
    return this.http.get(BASE_URI + '/pservice/groups/' + groupName).map(
      (res) => res.json()
    );
  }

  replaceGroup(groupName: string, param: any): Observable<any> {
    return this.http.put(BASE_URI + '/pservice/groups/' + groupName, param).map(
      (res) => res.json()
    );
  }
}
