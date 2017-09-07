import { Component, Injectable, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { UserService } from '../shared/services/user.service';
import 'rxjs/Rx';
import {BASE_URI} from "../shared/oc-info";
import {HttpInterceptor} from "../shared/interceptor/HttpInterceptor";
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
  private showNotAdminMessage: boolean = false;

  constructor(private router: Router, private _userService: UserService) {

  }

  ngOnInit() {
    this.user = {username: '', password: ''};
    document.getElementById('canvas_full').oncontextmenu = () => { return false; };
    backgroundShaking('canvas-container', 'canvas_full', '#006691', '#005173');
  }

  loginUsr() {
    this.isSubmitting = true;
    this._userService.login(this.user)
        .subscribe(
          data => {
            this.handleLoginResponse(data);
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

  handleLoginResponse(data) {
    if (data.error) {
      alert(data.error);
      return false;
    }
    localStorage.setItem('access_token', data.token.access_token);
    localStorage.setItem('refresh_token', data.token.access_token);
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('isAuthenticated', 'true');

    this._userService.getUserDetail(data.token.access_token).subscribe({
      next: value => {
        if (value && value.authorities) {
          let roles = value.authorities;
          let isAdmin = false;
          for (let role of roles) {
            if (role.authority === 'ROLE_ADMIN') {
              isAdmin = true;
              break;
            }
          }
          this.showNotAdminMessage = !isAdmin;
          if (!isAdmin) {
            this._userService.logout();
          } else {
            this.loginSuccess();
          }
        }
      },
      error: err => {
        console.log('get user detail failed');
      }
    });

  }

  loginSuccess() {
    let redirectUrl = localStorage.getItem('lastVisitUrl');
    if (!redirectUrl || '/login' === redirectUrl) {
      redirectUrl = '/';
    }
    localStorage.removeItem('lastVisitUrl');
    this.router.navigate([redirectUrl]);
  }


}
