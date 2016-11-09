import { Component, Injectable, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { UserService } from '../shared/services/user.service';
import 'rxjs/Rx';

/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {

  public user: any;

  constructor(private _http: Http, private router: Router, private _userService: UserService) {

  }

  ngOnInit() {
    this.user = {username: '', password: ''};
  }

  loginUsr() {
    console.log(this._http, this.user);
    this._userService.login(this.user)
        .subscribe(data => {
          this.loginSuccess(data);
        });
  }

  loginSuccess(data) {
    if (data.error) {
        alert('验证失败');
        return false;
    }
    console.log('Login success:', data);
    localStorage.setItem('access_token', data.token.access_token);
    localStorage.setItem('refresh_token', data.token.access_token);
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('isAuthenticated', 'true');
    this.router.navigate(['/dashboard']);
  }
}
