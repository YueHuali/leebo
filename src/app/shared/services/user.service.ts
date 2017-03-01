import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { NODE_SERVER } from '../oc-info';

/**
 * Import interfaces that service depends on
 */

@Injectable()
export class UserService {

  private _loginApi = NODE_SERVER + '/loginusr';

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
}
