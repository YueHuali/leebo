import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {OrganizationService} from "../shared/services/organization.service";
import any = jasmine.any;
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ OrganizationService ]
})
export class UserComponent implements OnInit {

  users: any;

  orgs: any;

  orgName; any = '';

  bindUserName: any;

  curruentUser; string;

  leaveOrgName: any = '';

  adminOrgs: any;

  canNotJoin: boolean = true;

  constructor(private userService: UserService , private organizationService: OrganizationService, private router: Router) { }

  ngOnInit() {
    this.initInfo();
  }

  openJoinOrg(user) {
    window['$']('#userJoinOrg').modal('show');
    this.orgName = '';
    this.bindUserName = user.username;
  }


  joinOrg() {
    this.organizationService.confirmJoinOrg(this.bindUserName, this.orgName).subscribe(
      (res) => {
        console.log(res);
        window['$']('#userJoinOrg').modal('hide');
        if (res.ok) {
          alert('加入组织成功');
        }
        this.initInfo();
        this.router.navigateByUrl('/user');
      }, error  => {
        this.initInfo();
        window['$']('#userJoinOrg').modal('hide');
        this.router.navigateByUrl('/use');
      }
    );
  }

  openLeaveOrg(user) {
    window['$']('#userLeaveOrg').modal('show');
    this.leaveOrgName = '';
    this.bindUserName = user.username;
  }

  leaveOrg() {
    this.organizationService.leaveOrg(this.bindUserName, this.leaveOrgName).subscribe({
      next: res => {
        if (res.ok) {
          window['$']('#userLeaveOrg').modal('hide');
          alert('退出组织成功');
        }
        this.initInfo();
        this.router.navigateByUrl('/user');
      },
      complete: () => {
        this.router.navigateByUrl('/user');
      },
      error: error => {
        alert('退出组织失败');
        this.initInfo();
      }
    });


  }


  initInfo() {
    this.curruentUser = localStorage.getItem('username');
    this.organizationService.getUsers().subscribe(
      response => {
        this.users = response;
        this.users.body.forEach(user => {
          this.organizationService.getUserOrg(user.username).subscribe(res => {
            user.orgInfo = res;
            if (user.username === this.curruentUser) {
              this.orgs = user.orgInfo;
              user.canNotJoin = true;
              if (user.orgInfo) {
                 this.adminOrgs = user.orgInfo.filter((org) => {
                   return org.role === 'admin';
                 });
              }
            } else {
              if (user.orgInfo === null) {
                user.canNotJoin = false;
              }else {
                if (this.adminOrgs) {
                  let set = new Set();
                  set.add(true);
                  for (let i = 0; i < this.adminOrgs.length; i++) {
                    set.add(this.checkItemInArray(user.orgInfo, this.adminOrgs[i].name));
                  }
                  if (set.size === 1) {
                     user.canNotJoin = true;
                  }
                }
              }
            };
          });
        });
      }
    );
  }

  // 检查某个元素是否在指定数组里面有数据
  checkItemInArray(arr: any, str: any) {

    let isIn = false;

    arr.forEach((item) => {
      if (item.name === str) {
        isIn = true;
      }
    });

    return isIn;

  }


}
