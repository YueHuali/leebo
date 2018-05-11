import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {OrgGroupService} from '../shared/services/orgGroup.service';

@Component({
  selector: 'org-group',
  templateUrl: './org-group.component.html',
  styleUrls: ['./org-group.component.scss'],
  providers: [ OrgGroupService ]
})
export class OrgGroupComponent implements OnInit {
  orgGroups: any = [];
  newOrgGroup: any = {};
  ableFlag: boolean;
  orgGroupRadio: any;
  organizations: any;
  newOrg: any = {};
  currentOrgId = '1111';//qingyuan org for test

  constructor(private orgGroupService: OrgGroupService, private _router: Router) { }

  ngOnInit() {
    this.ableFlag = true;

    this.orgGroupService.getOrgGroupList().subscribe(
      (response) => this.orgGroups = response.json()
    );

    /*this.organizationService.getOrg().subscribe(
      response => this.organizations = response
    );*/

  }

  orgGroupSubmit() {
    this.ableFlag = false;
    this.orgGroupService.createOrgGroup(this.newOrgGroup, this.currentOrgId).subscribe(
      res => {
        location.reload();
      },
      error => {
        const errorData = error.json();
        alert(errorData['message']);
      }
    ) ;
  }

  orgGroupDelete() {
    if (!this.orgGroupRadio) {
      alert('请选择需要删除的组');
    } else {
      this.orgGroupService.deleteOrgGroup(this.orgGroupRadio).subscribe(
        res => {
          // navigateSelf(this._router);
          location.reload();
        }, error => {
          console.log('Delete:', error);
        }
      );
    }
  }

}
