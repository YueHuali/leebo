import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { QY_CONFIG } from './shared/oc-info';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private _userService: UserService,
               private title: Title) {
    this.title.setTitle(QY_CONFIG.qyadmin_title || '云管理后台');
  }

  isAuthenticated() {
    return this._userService.authenticated();
  }
}
