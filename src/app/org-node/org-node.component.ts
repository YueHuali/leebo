import { Component, OnInit } from '@angular/core';
import {OrgNodeService} from '../shared/services/orgNode.service';
import {OrgGroupService} from '../shared/services/orgGroup.service';

@Component({
  selector: 'org-node',
  templateUrl: './org-node.component.html',
  styleUrls: ['./org-node.component.scss'],
  providers: [ OrgNodeService, OrgGroupService ]
})
export class OrgNodeComponent implements OnInit {
  nodes: any = [];
  newNode: any = {};
  orgGroups: any = [];
  ableFlag: boolean;
  orgNodeRadio: any;
  currentOrgId = '1111';//qingyuan org for test

  constructor(private orgNodeService: OrgNodeService, private orgGroupService: OrgGroupService) { }

  ngOnInit() {
    this.ableFlag = true;

    this.orgNodeService.getOrgNodeList(this.currentOrgId).subscribe(
      (response) => this.nodes = response.json()
    );

    this.orgGroupService.getOrgGroupList().subscribe(
      (response) => this.orgGroups = response.json()
    );
  }

  addOrgNodeToOrgGroup() {
    if (!this.orgNodeRadio) {
      alert('请选择需要加入组的节点');
    } else {
      this.ableFlag = false;
      this.orgNodeService.addOrgNodeToOrgGroup(this.orgNodeRadio, this.newNode.group).subscribe(
        res => {
          location.reload();
        },
        error => {
          const errorData = error.json();
          alert(errorData['message']);
        }
      );
    }
  }

  removeOrgNodeFromOrgGroup() {
    if (!this.orgNodeRadio) {
      alert('请选择需要删除组的节点');
    } else {
      this.ableFlag = false;
      this.orgNodeService.removeOrgNodeFromOrgGroup(this.orgNodeRadio, this.newNode.group).subscribe(
        res => {
          location.reload();
        },
        error => {
          const errorData = error.json();
          alert(errorData['message']);
        }
      );
    }
  }

}
