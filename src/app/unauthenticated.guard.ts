import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(): Observable<boolean> | boolean {
    if (!this._userService.authenticated()) {
      return true;
    } else {
      this._router.navigate(['/']);
      return false;
    }
  }
}
