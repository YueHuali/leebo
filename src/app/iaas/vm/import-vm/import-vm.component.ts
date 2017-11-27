import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ResourceConfigService} from '../../../shared/services/resource-config.service';

@Component({
  selector: 'import-vm',
  templateUrl: './import-vm.component.html',
  providers: [  ResourceConfigService ]
})

export class ImportVmComponent implements OnInit {
  @Input() importVmList: any;
  @Output() onSave = new EventEmitter();
  importVmIds: any[] = [];
  orgName: any;
  projectList: any[];

  constructor(private resourceConfigService : ResourceConfigService) {
  }

  ngOnInit() {
    this.orgName='所有组织';
    this.resourceConfigService.getIaasProjects().subscribe(
      (data) => this.projectList = data.json()
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

  checkVmImport(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.importVmIds.push(id);
    } else {
      for (let i = 0; i < this.importVmIds.length; i++) {
        if (this.importVmIds[i] === id) {
          this.importVmIds.splice(i, 1);
          break;
        }
      }
    }
    this.onSave.emit(this.importVmIds);
    console.log(this.importVmIds);
  }

}
