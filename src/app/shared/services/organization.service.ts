import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_OC_URI, BASE_URI } from '../oc-info';
import { RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
/**
 * Created by hexiuyu on 2017/1/9.
 */
@Injectable()
export class OrganizationService {


  constructor(private http: HttpInterceptor) {
  }

  getUserOrg(user: string): Observable<any> {
    let obs: Observable<any> = Observable.create(observable => {
      this.http.get(BASE_OC_URI + '/oapi/v1/users/' + user).map(res => res.json()).subscribe(
        (res: any) => {
          let userOrgNames: Array<string> = new Array();
          let labels = res.metadata.labels;
          if (labels) {
            for (let prop in labels) {
              if (prop.substring(0, 4) === 'org.') {
                userOrgNames.push(prop.substring(4));
              }
            }
          }
          let userOrgInfos: Array<any> = new Array();
          if (userOrgNames.length > 0) {
            this.http.get(BASE_URI + '/uaa/organizations?name=' + userOrgNames.join(',')).map(res => res.json()).subscribe(
              (resBody: any) => {
                  for (let item of resBody.body) {
                    let orgInfo = {};
                    orgInfo['name'] = item['name'];
                    orgInfo['displayName'] = item['displayName'];
                    item['createBy'] === user ? orgInfo['role'] = 'admin' : orgInfo['role'] = 'member';
                    userOrgInfos.push(orgInfo);
                  }
                observable.next(userOrgInfos);
              }
            );
          }

      });
    });

    return obs;
  }

  getUserByOrg(org: string): Observable<any> {
    return this.http.get(BASE_OC_URI + '/oapi/v1/users?labelSelector=org.' + org).map(
      (res) => res.json()
    );
  }

  protected userBindOrg(user: string, org: string, role: string) {
    let body =  {metadata : {labels: {}}};
    body.metadata.labels['org.' + org] = role;
    let option: RequestOptionsArgs = this.addContentType('application/strategic-merge-patch+json');
    return this.http.patch(BASE_OC_URI + '/oapi/v1/users/' + user, body, option);
  }

  confirmJoinOrg(user: string, org: string): Observable<any> {
    return this.userBindOrg(user, org, 'member');
  }

  beOrgOwner(user: string, org: string): Observable<any> {
    return this.userBindOrg(user, org, 'admin');
  }

  leaveOrg(user: string, org: string): Observable<any> {
    let body =  {metadata : {labels: {}}};
    body.metadata.labels['org.' + org] = null;
    let option: RequestOptionsArgs = this.addContentType('application/strategic-merge-patch+json');
    return this.http.patch(BASE_OC_URI + '/oapi/v1/users/' + user, body, option);
  }

  createOrg(orgName: string, createBy: string, displayName: string, remark: string): Observable<any> {
    let body = {name: orgName, displayName: displayName, remark: remark, createBy: createBy};
    let obs: Observable<any> = Observable.create(observable => {
      this.http.post(BASE_URI + '/uaa/organizations', body).map(res => res.json()).subscribe(
        (resBody: any) => {
          this.beOrgOwner(createBy, orgName).subscribe(res => observable.next(res));
        },
        (err: any) => {
          observable.next({'error': err});
        }
      );
    });
    return obs;
  }

  addContentType(contentType: string): RequestOptionsArgs {
    let option: RequestOptionsArgs = new RequestOptions();
    let headers = new Headers();
    headers.append('Content-Type', contentType);
    option.headers = headers;
    return option;
  }

  getOrgByName(name: string): Observable<any> {
    return this.http.get(BASE_URI + '/uaa/organizations/' + name);
  }

}

