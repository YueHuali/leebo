import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { Title } from '@angular/platform-browser';
import { QY_CONFIG } from './shared/oc-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private _userService: UserService,
               private title: Title) {
    title.setTitle(QY_CONFIG.qyadmin_title || '轻元云平台')
  }
  isAuthenticated() {
    return this._userService.authenticated();
  }
}
