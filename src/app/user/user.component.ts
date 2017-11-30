import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {OrganizationService} from '../shared/services/organization.service';
import {GroupService} from '../shared/services/group.service';
import {Router} from '@angular/router';
import {QY_CONFIG} from '../shared/oc-info';



@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ OrganizationService , GroupService]
})
export class UserComponent implements OnInit {

  users: any;

  orgs: any;

  orgsLeave: any;

  orgName; any = '';

  bindUserName: any;

  curruentUser; string;

  leaveOrgName: any = '';

  orgsJoin: any;

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
    let orgsCopy = this.orgsJoin.slice(0);
    this.orgs = orgsCopy;
    this.bindUserName = user.username;
    if (user.orgInfo !== null && typeof(user.orgInfo) !== undefined) {
      user.orgInfo.forEach((org) => {
        for (let i = 0; i < this.orgs.length; i++) {
          if (this.orgs[i].name === org.name) {
            this.orgs.splice(i, 1);
          }
        }
      });
    }
  }


  joinOrg() {
    this.organizationService.confirmJoinOrg(this.bindUserName, this.orgName).subscribe(
      (res) => {
        if (QY_CONFIG.iaas_enabled !== true) { // 只有paas 则直接判断paas请求是否成功
          if (res.ok) { // 如果paas成功则 继续下一步加入group
            this.groupService.getGroupByName(this.orgName + '-adm').subscribe(
              response => {
                response.users.push(this.bindUserName);
                this.groupService.replaceGroup(response.metadata.name, response).subscribe();
              }
            );
            alert('加入组织成功');
            this.initInfo();
          }else { // 失败的话  则需要回退注册成功的用户
            alert('加入组织失败');
          }
        }else { // 有iaas  则先判断iaas用户是否添加成功
          if (res.ok) { // 如果注册Iaas用户成功  则继续注册paas
            this.organizationService.addUserToPaasOrg(this.bindUserName, this.orgName, 'member').subscribe((resp) => {
                if (resp.ok) { // 如果注册paas成功则 继续下一步加入group
                  this.groupService.getGroupByName(this.orgName + '-adm').subscribe(
                    response => {
                      response.users.push(this.bindUserName);
                      this.groupService.replaceGroup(response.metadata.name, response).subscribe();
                    }
                  );
                  alert('加入组织成功');
                  this.initInfo();
                }else { // 失败的话  则需要回退注册成功的用户
                  this.organizationService.removeIaasUser(this.bindUserName, this.orgName);
                  alert('加入组织失败');
                }
              },
              error2 => {
                alert('加入组织失败');
              }
            );
          }else {
            alert('加入组织失败');
          }
        }
        window['$']('#userJoinOrg').modal('hide');
        this.router.navigateByUrl('/user');
      }, error  => {
        alert('加入组织失败');
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
    this.orgsLeave = user.orgInfo;

  }

  leaveOrg() {
    this.organizationService.leaveOrg(this.bindUserName, this.leaveOrgName).subscribe({
      next: res => {
        if (res.ok) {// 如果移除paas成功 则移除group
          this.groupService.getGroupByName(this.leaveOrgName + '-adm').subscribe(
            response => {
              response.users.splice(response.users.indexOf(this.bindUserName), 1);
              this.groupService.replaceGroup(response.metadata.name, response).subscribe();
            }
          );
          alert('移出组织成功');
          this.initInfo();
        }else {// 移出paas失败 则将Iaas用户添加进去(就是回退)
          alert('移出组织失败');
          this.organizationService.registerIaasUser(this.bindUserName, this.leaveOrgName);
        }
        window['$']('#userLeaveOrg').modal('hide');

        this.router.navigateByUrl('/user');
      },
      complete: () => {
        this.router.navigateByUrl('/user');
      },
      error: error => {
        alert('移出组织失败');
        window['$']('#userLeaveOrg').modal('hide');
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
          this.organizationService.getOrg().subscribe(res => {
            this.orgs = res.body;
            this.orgsJoin = res.body;
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
