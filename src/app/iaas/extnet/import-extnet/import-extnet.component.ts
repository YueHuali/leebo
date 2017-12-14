import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {extnet} from '../extnet';
import {isUndefined} from 'util';
import {ExtnetImportService} from '../../../shared/services/iaas/extnet-import.service';
import {ResourceConfigService} from '../../../shared/services/resource-config.service';
import { Router } from '@angular/router';
@Component({
  selector: 'import-extnet',
  templateUrl: './import-extnet.component.html',
  providers: [ ExtnetImportService, ResourceConfigService ]
})

export class ImportExtnetComponent implements OnInit {
  createExtnet:any = {};
  projectList: any[];
  importFlag: boolean = true;


  constructor(private extnetImportService: ExtnetImportService,private ngRouter: Router) { }

  ngOnInit() {
  }

  createExtnetSubmit() {
    console.log('importExtnetSubmit chkIds:', this.createExtnet.name+'  '+this.createExtnet.uuid);
    if(this.createExtnet.name.length > 0 && !isUndefined(this.createExtnet.name)) {
      this.importFlag = false;

      this.extnetImportService.createExtnetToDb(this.createExtnet).subscribe(
        res => {
          this.ngRouter.navigateByUrl('/extnet');
        },
        error => {
          let errorData = error.json();
          alert(errorData['message']);
        }
      );
    }else{
      alert("请输入需要添加的外网名称！");
    }
  }

  exist(name:string){

  }


}
