import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/**
 * Import interfaces that service depends on
 */

@Injectable()
export class UserService {

  private _loginApi = 'http://localhost:3030/loginusr';
  private _logoutApi = this._apiBase + '/logout';
  private _authenticatedApi = this._apiBase + '/api/authenticated';
  private _registerApi = this._apiBase + '/api/users/register';
  private _userExistsApi = this._apiBase + '/api/users/exists';

  constructor (private http: Http, @Inject('apiBase') private _apiBase: string) {

  }


  login(user) {
    return this.http.post(this._loginApi, user)
              .map((res: Response) => res.json())
              .catch(this.handleError);
  }

  authenticated() {
    let flag = !!localStorage.getItem('isAuthenticated');
    console.log('isAuthenticated: ', flag);
    return flag;
  }

  loginUsr(user) {
    console.log(this.http, user);
    return this.http.post('http://localhost:3030/loginusr', user)
      .map(res => res.json());
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

  register(user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._registerApi, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  getUsers() {
    return this.http.get(this._apiBase + "/api/users?limit=5&desc=true", <RequestOptionsArgs> {withCredentials: true})
                  .map((res: Response) => res.json())
                  .catch(this.handleError);
  }

  getMe() {
    return this.http.get(this._apiBase + '/api/users/me/', <RequestOptionsArgs> {withCredentials: true})
                  .map((res: Response) => res.json().me)
                  .catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }
}
