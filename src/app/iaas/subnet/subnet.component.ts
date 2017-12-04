import { Component, OnInit } from '@angular/core';
import {Subnet} from './subnet';
import {isUndefined} from 'util';
import {SubnetImportService} from '../../shared/services/iaas/subnet-import.service';
import {ResourceConfigService} from '../../shared/services/resource-config.service';

@Component({
  selector: 'subnet',
  templateUrl: './subnet.component.html',
  styleUrls: ['./subnet.component.scss'],
  providers: [ SubnetImportService, ResourceConfigService ]
})

export class SubnetComponent implements OnInit {

  orgName: any;
  projectList: any[];
  subnets: any[];
  chkSubnetIds: any[];
  subnetList: any[];
  importFlag: boolean = true;
  removeFlag: boolean = true;

  removeSubnetIds: any[] = [];

  constructor(private subnetImportService: SubnetImportService, private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.orgName = '所有组织';
    this.resourceConfigService.getIaasProjects().subscribe(
      (data) => this.projectList = data.json()
    );

    this.subnetImportService.getSubnets().subscribe(
      (data) => this.subnets = data.json()
    );

    this.subnetImportService.getIaasSubnets().subscribe(
      (data) => {
        this.subnetList = data.json().subnets;
        for (let importSubnet of this.subnetList) {
          for (let subnet of this.subnets) {
            if(importSubnet.id === subnet.id){
              importSubnet.isUsed = 'true';
            }
          }
          for (let project of this.projectList) {
            if(importSubnet.tenant_id === project.id) {
              importSubnet.projectName = project.name;
            }
          }
        }
      }
    );
  }

  checkItem(item: any){
    if(this.orgName === '所有组织'){
      return true;
    }else if(this.orgName === item.projectName){
      return true;
    }else{
      return false;
    }
  }

  saveChkSubnetIds(chkIds) {
    console.log('saveChkSubnetIds chkIds:', chkIds);
    this.chkSubnetIds = chkIds;
  }

  resetSubnetIds() {
    this.chkSubnetIds = [];
    console.log('resetSubnetIds chkIds:', this.chkSubnetIds);
  }

  importSubnetSubmit() {
    console.log('importSubnetSubmit chkIds:', this.chkSubnetIds);
    if(this.chkSubnetIds.length > 0 && !isUndefined(this.chkSubnetIds)) {
      this.importFlag = false;
      let subnets = this.transformSubnet();
      this.subnetImportService.importSubnetsToDb(subnets).subscribe(
        res => {
          location.reload();
        },
        error => {
          let errorData = error.json();
          alert(errorData['message']);
        }
      );
    }else{
      alert("请选择需要导入的网络");
    }
  }

  transformSubnet(): any[] {
    let subnets = new Array();
    for (let i = 0; i < this.chkSubnetIds.length; i++) {
      for (let j = 0; j < this.subnetList.length; j++) {
        if(this.chkSubnetIds[i] === this.subnetList[j].id) {
          let subnet = new Subnet();
          subnet.id = this.chkSubnetIds[i];
          subnet.name = this.subnetList[j].name;
          subnet.gateway_ip = this.subnetList[j].gateway_ip;
          subnet.network_id = this.subnetList[j].network_id;
          subnet.tenant_id = this.subnetList[j].tenant_id;
          subnet.cidr = this.subnetList[j].cidr;
          subnets.push(subnet);
          console.log('subnet=', JSON.stringify(subnet));
          break;
        }
      }
    }
    return subnets;
  }

  checkSubnetRemove(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeSubnetIds.push(id);
    } else {
      for (let i = 0; i < this.removeSubnetIds.length; i++) {
        if (this.removeSubnetIds[i] === id) {
          this.removeSubnetIds.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.removeSubnetIds);
  }

  removeSubnet() {
    console.log('Remove subnet chkIds:', this.removeSubnetIds);
    if(this.removeSubnetIds.length > 0 && !isUndefined(this.removeSubnetIds) && this.removeFlag) {
      if(confirm("确认要移除？")){
        this.removeFlag = false;
        this.subnetImportService.removeSubnetsFromDb(this.removeSubnetIds).subscribe(
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
      alert("请选择需要移除的子网");
    }
  }

}
