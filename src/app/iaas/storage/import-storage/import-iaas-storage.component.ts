import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {StorageImportService} from '../../../shared/services/iaas/storage-import.service';
import {Storage} from '../storage';

@Component({
  selector: 'import-iaas-storage',
  templateUrl: './import-iaas-storage.component.html',
  providers: [ StorageImportService ]
})

export class ImportIaasStorageComponent implements OnInit {
  @Input() importProectList: any;
  @Input() importStorageList: any;
  @Output() onSave = new EventEmitter();
  importStorageIds: any[] = [];
  storagesForPrj: any;
  checkedStorage:any;
  itemOrgName:any;
  constructor(private storageImportService: StorageImportService) {
  }

  ngOnInit() {
    this.checkedStorage='所有组织';
    this.storagesForPrj = null;
    console.log("import storage ");
    this.storageImportService.getAllStorageByAdmin().subscribe(
      (data) => {
        this.storagesForPrj = data.json().volumes;
        for (let importStorage of this.storagesForPrj) {
          for (let storage of this.importStorageList) {
            if(importStorage.id === storage.id){
              console.log("id=", storage.id);
              importStorage.isUsed = 'true';
            }
          }
        }
      }
    );
  }

  selectProject(projectId: any) {
        this.checkedStorage=projectId;
   }
  check(item:any){
    this.checkOrgName(item);
    if(this.checkedStorage==='所有组织'){
      return true;
    }else {
      if(this.checkedStorage===item["os-vol-tenant-attr:tenant_id"]){
        return true;
      }
      return false;
    }
  }
  checkOrgName(item:any){
    this.itemOrgName='';
        for(let i=0;i<this.importProectList.length;i++){
             if(this.importProectList[i].id===item["os-vol-tenant-attr:tenant_id"]){
                  this.itemOrgName=this.importProectList[i].name;
                  break;
             }
        }
  }
  checkStorageImport(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.importStorageIds.push(id);
    } else {
      for (let i = 0; i < this.importStorageIds.length; i++) {
        if (this.importStorageIds[i] === id) {
          this.importStorageIds.splice(i, 1);
          break;
        }
      }
    }
    // this.onSave.emit(this.importStorageIds);
    let storages = new Array();
    for (let i = 0; i < this.importStorageIds.length; i++) {
      for (let j = 0; j < this.storagesForPrj.length; j++) {
        if(this.importStorageIds[i] === this.storagesForPrj[j].id) {
          let storage = new Storage();
          storage.id = this.storagesForPrj[j].id;
          storage.name = this.storagesForPrj[j].name;
          storage.tenant_id = this.storagesForPrj[j]["os-vol-tenant-attr:tenant_id"];
          storage.size = this.storagesForPrj[j].size;
          storages.push(storage);
          console.log('storage=', JSON.stringify(storage));
          break;
        }
      }
    }
    this.onSave.emit(storages);
    console.log(this.importStorageIds);
  }

}
