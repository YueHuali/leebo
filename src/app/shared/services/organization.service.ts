import {HttpInterceptor} from '../interceptor/HttpInterceptor';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { BASE_OC_URI, BASE_URI, BASE_IAAS_SERVICE, QY_CONFIG } from '../oc-info';
import {RequestOptions, RequestOptionsArgs, Headers, Http} from '@angular/http';
/**
 * Created by hexiuyu on 2017/1/9.
 */
@Injectable()
export class OrganizationService {

  requestOptions: RequestOptions;

  constructor(private http: HttpInterceptor, private httpSpecial: Http) {
  }



  getUsers(): Observable<any> {
    return this.http.get(BASE_URI + '/uaa/users').map( res => res.json());
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
    return this.http.get(BASE_URI + '/pservice/users?labelSelector=org.' + org).map(
      (res) => res.json()
    );
  }

  getOrg(): Observable<any> {
    return this.http.get(BASE_URI + '/uaa/organizations').map( res => res.json());
  }

  protected userBindOrg(user: string, org: string, role: string) {

    this.registerIaasUser(user, org);

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
    this.http.delete(BASE_IAAS_SERVICE + '/iaasUsers/' + user + '/organization/' + org).subscribe();
    let body =  {metadata : {labels: {}}};
    body.metadata.labels['org.' + org] = null;
    return this.http.patch(BASE_URI + '/pservice/users/' + user, body);
  }

  //Add to register iaas user with new project
  registerIaasUser(username, projectName) {

    this.getRequestOptionArgs(this.requestOptions, projectName);

    let iaasEnabled = QY_CONFIG.iaas_enabled;
    if (iaasEnabled === true) {
      let objUrl = BASE_IAAS_SERVICE + '/iaasusers';
      console.log('objUrl=', objUrl);
      console.log('username=', username);
      let objBody = {
        "username": username,
        "projectname": projectName
      };
      this.http.intercept(this.httpSpecial.post(objUrl, objBody, this.getRequestOptionArgs(this.requestOptions, projectName))).subscribe();
      //this.httpSpecial.post(objUrl, objBody, this.getRequestOptionArgs(this.requestOptions, projectName) ).subscribe();
    }
  }

  createOrg(orgName: string, createBy: string, displayName: string, remark: string): Observable<any> {

    this.registerIaasUser(createBy, orgName);

    let body = {name: orgName, displayName: displayName, remark: remark, createBy: createBy};
    let obs: Observable<any> = Observable.create(observable => {
      this.http.post(BASE_URI + '/uaa/organizations', body).map(res => res.json()).subscribe(
        // (resBody: any) => {
        //   this.beOrgOwner(createBy, orgName).subscribe(res => observable.next(res));
        // },
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
    return this.http.get(BASE_URI + '/uaa/organizations/' + name).map(res => res.json());
  }

  removeOrg(name: string): Observable<any> {
    return this.http.delete(BASE_URI + "/uaa/organizations/" + name);
  }

  getProjectsByOrg(org: string) {
    return this.http.get(BASE_OC_URI + '/oapi/v1/projects?labelSelector=organization%3D' + org);
  }

  updatePwd(user:any) {
    return this.http.post(BASE_URI + '/uaa/update-pwd', user)
      .map((res) => {
        return res.json();
      });
  }


  getRequestOptionArgs(options?: RequestOptionsArgs, projectName?: string): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    if (options.headers.get('Content-Type') == null) {
      options.headers.append('Content-Type', 'application/json');
    }

    options.headers.append('Accept', 'application/json');
    options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    options.headers.append('API-ORGANIZATION', projectName);
    options.withCredentials = false;
    return options;
  }


}

