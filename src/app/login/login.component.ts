import { Component, Injectable, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { UserService } from '../shared/services/user.service';
import 'rxjs/Rx';
declare let backgroundShaking;

/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable()
export class LoginComponent implements OnInit {

  public user: any;

  private isSubmitting: boolean = false;

  constructor(private _http: Http, private router: Router, private _userService: UserService) {

  }

  ngOnInit() {
    this.user = {username: '', password: ''};
    document.getElementById('canvas_full').oncontextmenu = () => { return false; };
    backgroundShaking('canvas-container', 'canvas_full', '#006691', '#005173');
  }

  loginUsr() {
    this.isSubmitting = true;
    console.log(this._http, this.user);
    this._userService.login(this.user)
        .subscribe(
          data => {
            this.loginSuccess(data);
          },
          error => {
            let res = error.json();
            alert(res.error || '连接认证服务器失败');
            this.isSubmitting = false;
          },
          () => {
            this.isSubmitting = false;
          }
        );
  }

  loginSuccess(data) {
    if (data.error) {
      alert(data.error);
      return false;
    }
    localStorage.setItem('access_token', data.token.access_token);
    localStorage.setItem('refresh_token', data.token.access_token);
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('isAuthenticated', 'true');
    let redirectUrl = localStorage.getItem('lastVisitUrl');
    if (!redirectUrl || '/login' === redirectUrl) {
      redirectUrl = '/';
    }
    localStorage.removeItem('lastVisitUrl');
    this.router.navigate([redirectUrl]);
  }
}
