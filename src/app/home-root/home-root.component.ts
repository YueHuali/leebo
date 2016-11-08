import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from  '../shared/services/user.service';

@Component({
    selector: 'home-root',
    templateUrl: './home-root.component.html',
    styleUrls: ['./home-root.component.css']
})

export class HomeRootComponent implements OnInit {

  title = 'QY X-Launch';
  username: string;
  profile_picture: string;

  constructor(private _userService: UserService, private _router: Router) {

  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  logout() {
    /**
     * Total hack until new router is used (for authentication and activation logic)
     */
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAuthenticated');
    this._router.navigate(['/login']);
  }

}
