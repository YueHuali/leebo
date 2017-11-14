import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {OrganizationService} from "../shared/services/organization.service";
import any = jasmine.any;
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GroupService} from '../shared/services/group.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ OrganizationService ,GroupService]
})
export class UserComponent implements OnInit {

  users: any;

  orgs: any;

  orgsLeave: any;

  orgName; any = '';

  bindUserName: any;

  curruentUser; string;

  leaveOrgName: any = '';

  adminOrgs: any;

  canNotJoin: boolean = true;

  constructor(private userService: UserService ,
                private organizationService: OrganizationService,
                private router: Router,
                private groupService: GroupService) { }

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
    this.groupService.getGroupByName(this.orgName + '-adm').subscribe(
      response => {
        response.users.push(this.bindUserName);
        this.groupService.replaceGroup(response.metadata.name, response).subscribe();
      }
    );


  }

  openLeaveOrg(user) {
    window['$']('#userLeaveOrg').modal('show');
    this.leaveOrgName = '';
    this.bindUserName = user.username;
    this.orgsLeave = user.orgInfo;

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

    this.groupService.getGroupByName(this.leaveOrgName + '-adm').subscribe(
      response => {
        response.users.splice(response.users.indexOf(this.bindUserName), 1);
        this.groupService.replaceGroup(response.metadata.name, response).subscribe();
      }
    );
  }


  initInfo() {
    this.curruentUser = localStorage.getItem('username');
    this.organizationService.getUsers().subscribe(
      response => {
        this.users = response;
        this.users.body.forEach(user => {
          this.organizationService.getOrg().subscribe(res => {
            this.orgs = res.body;
            this.organizationService.getUserOrg(user.username).subscribe( resp => {
              user.orgInfo = resp;
              if (user.orgInfo === null) {
                user.canNotJoin = false;
              }else {
                if (this.orgs.length === user.orgInfo.length) {
                  user.canNotJoin = true;
                }
              };
            });
          });
        });
      }
    );
  }

}
