import {Component, OnInit} from '@angular/core';
import {FloatingIp} from './FloatingIp';
import {isUndefined} from 'util';
import {FloatingIpImportService} from '../../shared/services/iaas/floatingIp-import.service';
import {ResourceConfigService} from '../../shared/services/resource-config.service';

@Component({
  selector: 'floatingIp',
  templateUrl: './floatingIp.component.html',
  styleUrls: ['./floatingIp.component.scss'],
  providers: [ FloatingIpImportService, ResourceConfigService ]
})

export class FloatingIpComponent implements OnInit {

  projectList: any[];
  floatingIps: any[];
  chkFloatingIpIds: any[];
  floatingIpList: any[];
  importFlag: boolean = true;
  removeFlag: boolean = true;

  removeFloatingIpIds: any[] = [];

  constructor(private floatingIpImportService: FloatingIpImportService, private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.resourceConfigService.getIaasProjects().subscribe(
      (data) => this.projectList = data.json()
    );

    this.floatingIpImportService.getFloatingIps().subscribe(
      (data) => this.floatingIps = data.json()
    );

    this.floatingIpImportService.getIaasFloatingIps().subscribe(
      (data) => {
        this.floatingIpList = data.json().floatingips;
        for (let importFloatingIp of this.floatingIpList) {
          for (let floatingIp of this.floatingIps) {
            if(importFloatingIp.id === floatingIp.id){
              importFloatingIp.isUsed = 'true';
            }
          }
          for (let project of this.projectList) {
            if(importFloatingIp.tenant_id === project.id) {
              importFloatingIp.projectName = project.name;
            }
          }
        }
      }
    );
  }

  saveChkFloatingIpIds(chkIds) {
    console.log('saveChkFloatingIpIds chkIds:', chkIds);
    this.chkFloatingIpIds = chkIds;
  }

  resetFloatingIpIds() {
    this.chkFloatingIpIds = [];
    console.log('resetFloatingIpIds chkIds:', this.chkFloatingIpIds);
  }

  importFloatingIpSubmit() {
    console.log('importFloatingIpSubmit chkIds:', this.chkFloatingIpIds);
    if(this.chkFloatingIpIds.length > 0 && !isUndefined(this.chkFloatingIpIds)) {
      this.importFlag = false;
      let floatingIps = this.transformFloatingIp();
      this.floatingIpImportService.importFloatingIpsToDb(floatingIps).subscribe(
        res => {
          location.reload();
        },
        error => {
          let errorData = error.json();
          alert(errorData['message']);
        }
      );
    }else{
      alert("请选择需要导入的镜像");
    }
  }

  transformFloatingIp(): any[] {
    let floatingIps = new Array();
    for (let i = 0; i < this.chkFloatingIpIds.length; i++) {
      for (let j = 0; j < this.floatingIpList.length; j++) {
        if(this.chkFloatingIpIds[i] === this.floatingIpList[j].id) {
          let floatingIp = new FloatingIp();
          floatingIp.id = this.chkFloatingIpIds[i];
          floatingIp.name = this.floatingIpList[j].id;
          floatingIp.floating_ip_address = this.floatingIpList[j].floating_ip_address;
          floatingIp.tenant_id = this.floatingIpList[j].tenant_id;
          floatingIps.push(floatingIp);
          console.log('floatingIp=', JSON.stringify(floatingIp));
          break;
        }
      }
    }
    return floatingIps;
  }

  checkFloatingIpRemove(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeFloatingIpIds.push(id);
    } else {
      for (let i = 0; i < this.removeFloatingIpIds.length; i++) {
        if (this.removeFloatingIpIds[i] === id) {
          this.removeFloatingIpIds.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.removeFloatingIpIds);
  }

  removeFloatingIp() {
    console.log('Remove floatingIp chkIds:', this.removeFloatingIpIds);
    if(this.removeFloatingIpIds.length > 0 && !isUndefined(this.removeFloatingIpIds) && this.removeFlag) {
      if(confirm("确认要移除？")){
        this.removeFlag = false;
        this.floatingIpImportService.removeFloatingIpsFromDb(this.removeFloatingIpIds).subscribe(
          res => {
            location.reload();
          },
          error => {
            let errorData = error.json();
            alert(errorData['message']);
          }
        );
      }
    }else{
      alert("请选择需要移除的镜像");
    }
  }

}
