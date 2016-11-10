import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from  '../services/user.service';

@Component({
    selector: 'top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent implements OnInit {

  title = 'QY X-Launch';
  username: string;

  constructor(private _userService: UserService, private _router: Router) {

  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  logout() {
    let flag: boolean = confirm('确认要注销？');

    if (flag && this._userService.logout()) {
        this._router.navigate(['/login']);
    }
  }

  changeTheme(color: string): void {
		// var link: any = $('<link>');
		// link
		// 	.appendTo('head')
		// 	.attr({type : 'text/css', rel : 'stylesheet'})
		// 	.attr('href', 'themes/app-'+color+'.css');
  }

  rtl(): void {
		// var body: any = $('body');
		// body.toggleClass('rtl');
  }

  sidebarToggler(): void  {
		// var sidebar: any = $('#sidebar');
		// var mainContainer: any = $('.main-container');
		// sidebar.toggleClass('sidebar-left-zero');
		// mainContainer.toggleClass('main-container-ml-zero');
  }
}
