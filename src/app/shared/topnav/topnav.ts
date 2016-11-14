import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from  '../services/user.service';
import { DatacentService } from '../services/datacent.service';
import {Datacent} from '../services/datacent';

@Component({
  selector: 'top-nav',
  templateUrl: 'topnav.html',
  providers: [ DatacentService ]
})

export class TopNavComponent implements OnInit {

  title = 'QY X-Launch';
  username: string;
  datacents: Datacent[];
  currentDc: Datacent;
  constructor(private _userService: UserService, private _router: Router, private dcService: DatacentService) {

  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.datacents = this.dcService.getDatacents();
    this.currentDc = this.datacents[0];
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

  chooseDc(name: string): void {
    this.currentDc = {name: name};
  }
}
