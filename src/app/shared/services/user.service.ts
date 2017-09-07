import { Injectable, Inject } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {BASE_URI, NODE_SERVER, QY_CONFIG} from '../oc-info';

/**
 * Import interfaces that service depends on
 */

@Injectable()
export class UserService {

  private _loginApi = NODE_SERVER + '/loginusr';

  private _registerApi = NODE_SERVER + '/addnewusr';

  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {

  }


  login(user) {
    return this.http.post(this._loginApi, user)
              .map((res: Response) => res.json())
              .catch(this.handleError);
  }

  authenticated() {
    return 'true' === localStorage.getItem('isAuthenticated');
  }

  logout() {
    /**
     * Total hack until new route is used (for authentication and activation logic)
     */
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAuthenticated');

    return true;
  }


  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }


  register(user) {
    return this.http.post(this._registerApi, user)
      .map((res: Response) => {
      return res.json();
      })
      .catch(this.handleError);
  }

  updatePwd(user:any) {
    return this.http.post(BASE_URI + '/uaa/update-pwd', user)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  getUserDetail(accessToken: string) {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);
    return this.http.get(`${BASE_URI}/uaa/user`, {headers: headers})
      .map(res => res.json());
  }
}
