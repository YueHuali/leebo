import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {VolumeTypeCreateService} from '../../../shared/services/iaas/volumeType-create.service';
import {ResourceConfigService} from '../../../shared/services/resource-config.service';
import {VolumeType} from '../volumeType';
import {Router} from '@angular/router';
import {isUndefined} from 'util';

@Component({
  selector: 'volumeType-create',
  templateUrl: './volumeType-create.component.html',
  providers: [ VolumeTypeCreateService, ResourceConfigService]
})
export class VolumeTypeCreateComponent implements OnInit {

  createVolumeType: any = {};
  projectList: any[];
  createFlag: boolean = true;
  volumeTypesForJ: any[];

  constructor(private volumeTypeCreateService: VolumeTypeCreateService, private ngRouter: Router) { }

  ngOnInit() {
    this.volumeTypeCreateService.getVolumeTypes().subscribe(
      (data) => {this.volumeTypesForJ = data.json();
        console.log("AllVolumeTypesInDB: "+ JSON.stringify(this.volumeTypesForJ));
      }
    );
  }

  createVolumeTypeSubmit() {
    console.log('createVolumeTypeSubmit chkIds:', this.createVolumeType.name+'  '+this.createVolumeType.uuid);
    if(this.createVolumeType.name.length > 0 && !isUndefined(this.createVolumeType.name)) {
      this.createFlag = false;

      this.volumeTypeCreateService.createVolumeType(this.createVolumeType).subscribe(
        res => {
          this.ngRouter.navigateByUrl('/volumeType');
        },
        error => {
          let errorData = error.json();
          alert(errorData['message']);
        }
      );
    }else{
      alert("请输入需要添加的存储类型名称！");
    }
  }

  existName(nameForTest: string){
    if(this.volumeTypesForJ){
      for (let i = 0; i< this.volumeTypesForJ.length; i++){
        if (nameForTest === this.volumeTypesForJ[i].name){
          return true;
        }
      }
      return false;
    }else {
      return false;
    }


  }

  existDisplayName(displayName: string){
    if(this.volumeTypesForJ) {

      for (let i = 0; i < this.volumeTypesForJ.length; i++) {
        if (displayName === this.volumeTypesForJ[i].display_name) {
          return true;
        }
      }
      return false;

    }else {
      return false;
    }
  }
}
