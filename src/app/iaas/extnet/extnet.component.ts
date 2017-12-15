import {Component, OnInit} from '@angular/core';
import {extnet} from './extnet';
import {isUndefined} from 'util';
import {ExtnetImportService} from '../../shared/services/iaas/extnet-import.service';
import {ResourceConfigService} from '../../shared/services/resource-config.service';

@Component({
  selector: 'extnet',
  templateUrl: './extnet.component.html',
  styleUrls: ['./extnet.component.scss'],
  providers: [ ExtnetImportService, ResourceConfigService ]
})

export class ExtnetComponent implements OnInit {
  projectList: any[];
  extnets: any[];
  importFlag: boolean = true;
  removeFlag: boolean = true;
  removeExtnetIds: any[] = [];

  constructor(private extnetImportService: ExtnetImportService, private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.resourceConfigService.getIaasProjects().subscribe(
      (data) => this.projectList = data.json()
    );

    this.extnetImportService.getExtnet().subscribe(
      (data) => this.extnets = data.json()
    );

  }

  checkExtnetRemove(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeExtnetIds.push(id);
    } else {
      for (let i = 0; i < this.removeExtnetIds.length; i++) {
        if (this.removeExtnetIds[i] === id) {
          this.removeExtnetIds.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.removeExtnetIds);
  }

  removeExtnet() {
    console.log('Remove Extnet chkIds:', this.removeExtnetIds);
    if(this.removeExtnetIds.length > 0 && !isUndefined(this.removeExtnetIds) && this.removeFlag) {
      if(confirm("确认要移除？")){
        this.removeFlag = false;
        this.extnetImportService.removeExtnetFromDb(this.removeExtnetIds).subscribe(
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
      alert("请选择需要移除的外网");
    }
  }

  check(id:number){
   if(id>=0){
      return true;
   }
   return false;
  }

}
