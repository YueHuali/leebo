import { Component, OnInit } from '@angular/core';
import {GroupService} from '../shared/services/group.service';
import {navigateSelf} from '../shared/oc-info';
import {Router} from '@angular/router';
import {OrganizationService} from '../shared/services/organization.service';

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  providers: [ GroupService, OrganizationService ]
})
export class GroupComponent implements OnInit {

  groups: any = [];
  newGroup: any = {};
  ableFlag: boolean;
  groupRadio: any;
  organizations: any;
  newOrg: any = {};

  constructor(private groupService: GroupService, private organizationService: OrganizationService, private _router: Router) { }

  ngOnInit() {
    this.ableFlag = true;

    this.groupService.getGroupList().subscribe(
      (response) => this.groups = response.json()
    );

    this.organizationService.getOrg().subscribe(
      response => this.organizations = response
    );

  }

  groupSubmit() {
    this.ableFlag = false;
    this.groupService.createGroup(this.newGroup).subscribe(
      res => {
        location.reload();
      },
      error => {
        const errorData = error.json();
        alert(errorData['message']);
      }
    ) ;
  }

  groupDelete() {
    if (!this.groupRadio) {
      alert('请选择需要删除的组');
    } else {
      this.groupService.deleteGroup(this.groupRadio).subscribe(
        res => {
          // navigateSelf(this._router);
          location.reload();
        }, error => {
          console.log('Delete:', error);
        }
      );
    }
  }

  groupAssign() {
    this.ableFlag = false;
    this.groupService.assignGroup(this.groupRadio, this.newOrg.id).subscribe(
      res => {
        location.reload();
      },
      error => {
        const errorData = error.json();
        alert(errorData['message']);
      }
    ) ;
  }

  groupReclaim() {
    this.ableFlag = false;

    this.groupService.reclaimGroup(this.groupRadio, this.newOrg.id).subscribe(
      res => {
        location.reload();
      },
      error => {
        const errorData = error.json();
        alert(errorData['message']);
      }
    ) ;
  }
}
