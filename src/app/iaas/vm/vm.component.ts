import {Component, OnInit} from '@angular/core';
import {Vm} from './vm';
import {isUndefined} from 'util';
import {VmImportService} from '../../shared/services/iaas/vm-import.service';
import {ResourceConfigService} from '../../shared/services/resource-config.service';

@Component({
  selector: 'vm',
  templateUrl: './vm.component.html',
  styleUrls: ['./vm.component.scss'],
  providers: [ VmImportService, ResourceConfigService ]
})

export class VmComponent implements OnInit {

  orgName: any;
  projectList: any[];
  vms: any[];
  chkVmIds: any[];
  vmList: any[];
  importFlag: boolean = true;
  removeFlag: boolean = true;
  vmDetail: any;
  removeVmIds: any[] = [];

  constructor(private vmImportService: VmImportService, private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.orgName = '所有组织';
    this.resourceConfigService.getIaasProjects().subscribe(
      (data) => this.projectList = data.json()
    );

    this.vmImportService.getVms().subscribe(
      (data) => this.vms = data.json()
    );

    this.vmImportService.getIaasVms().subscribe(
      (data) => {
        this.vmList = data.json().servers;
        for (let importVm of this.vmList) {
          for (let vm of this.vms) {
            if(importVm.id === vm.id){
              importVm.isUsed = 'true';
            }
          }
          this.vmImportService.getIaasVmDetail(importVm.id).subscribe((data) => {
            this.vmDetail = data.json().server;
            for(let project of this.projectList) {
              if( project.id === this.vmDetail.tenant_id ) {
                importVm.projectName = project.name;
              }
            }
          });
        }
      });
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

  saveChkVmIds(chkIds) {
    console.log('saveChkVmIds chkIds:', chkIds);
    this.chkVmIds = chkIds;
  }

  resetVmIds() {
    this.chkVmIds = [];
    console.log('resetVmIds chkIds:', this.chkVmIds);
  }

  importVmSubmit() {
    console.log('importVmSubmit chkIds:', this.chkVmIds);
    if(this.chkVmIds.length > 0 && !isUndefined(this.chkVmIds)) {
      this.importFlag = false;
      let vms = this.transformVm();
      this.vmImportService.importVmsToDb(vms).subscribe(
        res => {
          location.reload();
        },
        error => {
          let errorData = error.json();
          alert(errorData['message']);
        }
      );
    }else{
      alert("请选择需要导入的虚拟机");
    }
  }

  transformVm(): any[] {
    let vms = new Array();
    for (let i = 0; i < this.chkVmIds.length; i++) {
      for (let j = 0; j < this.vmList.length; j++) {
        if(this.chkVmIds[i] === this.vmList[j].id) {
          let vm = new Vm();
          vm.id = this.chkVmIds[i];
          vm.name = this.vmList[j].name;
          vm.tenant_id = this.vmList[j].tenant_id;
          vms.push(vm);
          console.log('vm=', JSON.stringify(vm));
          break;
        }
      }
    }
    return vms;
  }

  checkVmRemove(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeVmIds.push(id);
    } else {
      for (let i = 0; i < this.removeVmIds.length; i++) {
        if (this.removeVmIds[i] === id) {
          this.removeVmIds.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.removeVmIds);
  }

  removeVm() {
    console.log('Remove vm chkIds:', this.removeVmIds);
    if(this.removeVmIds.length > 0 && !isUndefined(this.removeVmIds) && this.removeFlag) {
      if(confirm("确认要移除？")){
        this.removeFlag = false;
        this.vmImportService.removeVmsFromDb(this.removeVmIds).subscribe(
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
      alert("请选择需要移除的虚拟机");
    }
  }

}
