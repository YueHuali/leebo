import {Component, OnInit} from '@angular/core';
import {isUndefined} from 'util';
import {StorageImportService} from '../../shared/services/iaas/storage-import.service';
import {ResourceConfigService} from '../../shared/services/resource-config.service';

@Component({
  selector: 'storage',
  templateUrl: 'iaas-storage.component.html',
  styleUrls: ['iaas-storage.component.scss'],
  providers: [ StorageImportService, ResourceConfigService ]
})

export class IaasStorageComponent implements OnInit {
  orgName: any;
  projectList: any[];
  storages: any[];
  chkStorageIds: any[];
  storageList: any[];
  importFlag: boolean = true;
  removeFlag: boolean = true;

  removeStorageIds: any[] = [];

  constructor(private storageImportService: StorageImportService, private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.orgName = '所有组织';
    this.resourceConfigService.getIaasProjects().subscribe(
      (data) => this.projectList = data.json()
    );

    this.storageImportService.getStorages().subscribe(
      (data) => this.storages = data.json()
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

  saveChkStorageIds(chkIds) {
    console.log('saveChkStorageIds chkIds:', chkIds);
    this.chkStorageIds = chkIds;
  }

  saveStorageListByProject(list) {
    console.log('saveStorageListByProject list:', list);
    this.storageList = list;
  }

  resetStorageIds() {
    this.chkStorageIds = [];
    console.log('resetStorageIds chkIds:', this.chkStorageIds);
  }

  importIaasStorageSubmit() {
    if(this.storageList.length > 0 && !isUndefined(this.storageList)) {
      this.importFlag = false;
      this.storageImportService.importStoragesToDb(this.storageList).subscribe(
        res => {
          location.reload();
        },
        error => {
          let errorData = error.json();
          alert(errorData['message']);
        }
      );
    }else{
      alert("请选择需要导入的存储");
    }
  }

  checkStorageRemove(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeStorageIds.push(id);
    } else {
      for (let i = 0; i < this.removeStorageIds.length; i++) {
        if (this.removeStorageIds[i] === id) {
          this.removeStorageIds.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.removeStorageIds);
  }

  removeStorage() {
    console.log('Remove storage chkIds:', this.removeStorageIds);
    if(this.removeStorageIds.length > 0 && !isUndefined(this.removeStorageIds) && this.removeFlag) {
      if(confirm("确认要移除？")){
        this.removeFlag = false;
        this.storageImportService.removeStoragesFromDb(this.removeStorageIds).subscribe(
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
      alert("请选择需要移除的存储");
    }
  }

}
