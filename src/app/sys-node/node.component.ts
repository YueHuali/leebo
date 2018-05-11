import {Component, OnInit} from '@angular/core';
import {NodeService} from '../shared/services/node.service';
import {GroupService} from '../shared/services/group.service';
import {OrganizationService} from '../shared/services/organization.service';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  providers: [ NodeService, GroupService, OrganizationService ]
})
export class NodeComponent implements OnInit {

  ableFlag: boolean;
  nodes: any = [];
  groups: any = [];
  nodeRadio: any;
  newNode: any = {};
  organizations: any;
  newOrg: any = {};

  constructor(private nodeService: NodeService, private groupService: GroupService, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.ableFlag = true;

    this.nodeService.getNodeList().subscribe(
      (response) => this.nodes = response.json()
    );

    this.groupService.getGroupList().subscribe(
      (response) => this.groups = response.json()
    );

    this.organizationService.getOrg().subscribe(
      response => this.organizations = response
    );
  }

  nodeSubmit() {
    this.ableFlag = false;
    this.nodeService.createNode(this.newNode).subscribe(
      res => {
        location.reload();
      },
      error => {
        const errorData = error.json();
        alert(errorData['message']);
      }
    ) ;
  }

  nodeDelete() {
    if (!this.nodeRadio) {
      alert('请选择需要删除的节点');
    } else {
      this.nodeService.deleteNode(this.nodeRadio).subscribe(
        res => {
          // navigateSelf(this._router);
          location.reload();
        }, error => {
          console.log('Delete:', error);
        }
      );
    }
  }

  nodeDeploy() {
    if (!this.nodeRadio) {
      alert('请选择需要部署的节点');
    } else {
      this.nodeService.deployNode(this.nodeRadio).subscribe(
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

  addNodeToGroup() {
    if (!this.nodeRadio) {
      alert('请选择需要加入组的节点');
    } else {
      this.ableFlag = false;
      this.nodeService.addNodeToGroup(this.nodeRadio, this.newNode.group).subscribe(
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

  removeNodeFromGroup() {
    if (!this.nodeRadio) {
      alert('请选择需要删除组的节点');
    } else {
      this.ableFlag = false;
      this.nodeService.removeNodeFromGroup(this.nodeRadio, this.newNode.group).subscribe(
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

  nodeAssign() {
    if (!this.nodeRadio) {
      alert('请选择需要加入组的节点');
    } else {
      this.ableFlag = false;
      this.nodeService.assignNodeToOrg(this.nodeRadio, this.newOrg.id).subscribe(
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

  nodeReclaim() {
    if (!this.nodeRadio) {
      alert('请选择需要加入组的节点');
    } else {
      this.ableFlag = false;

      this.nodeService.reclaimNodeFromOrg(this.nodeRadio, this.newOrg.id).subscribe(
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
