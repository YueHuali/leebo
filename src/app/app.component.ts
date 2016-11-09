import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QY X-Launch';

  constructor (private _userService: UserService) {}
  isAuthenticated() {
    return this._userService.authenticated();
  }
}
