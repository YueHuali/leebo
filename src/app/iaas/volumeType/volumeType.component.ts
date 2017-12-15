import { Component, OnInit } from '@angular/core';
import {VolumeType} from './volumeType';
import {isUndefined} from 'util';
import {VolumeTypeCreateService} from '../../shared/services/iaas/volumeType-create.service';
import {ResourceConfigService} from '../../shared/services/resource-config.service';

@Component({
  selector: 'volumeType',
  templateUrl: './volumeType.component.html',
  styleUrls: ['./volumeType.component.scss'],
  providers: [ VolumeTypeCreateService, ResourceConfigService ]
})
export class VolumeTypeComponent implements OnInit {

  projectList: any[];
  volumeTypes: any[];
  createFlag: boolean = true;
  removeFlag: boolean = true;
  removeVolumeTypeNames: any[] = [];

  constructor(private volumeTypeCreateService: VolumeTypeCreateService, private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.resourceConfigService.getIaasProjects().subscribe(
      (data) => this.projectList = data.json()
    );

    this.volumeTypeCreateService.getVolumeTypes().subscribe(
      (data) => {this.volumeTypes = data.json();
      console.log("volumeTypes: "+ JSON.stringify(this.volumeTypes));
      }
    );
  }

  checkVolumeTypeRemove(event, name) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeVolumeTypeNames.push(name);
    } else {
      for (let i = 0; i < this.removeVolumeTypeNames.length; i++) {
        if (this.removeVolumeTypeNames[i] === name) {
          this.removeVolumeTypeNames.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.removeVolumeTypeNames);
  }

  removeVolumeType() {
    console.log('Remove volumeType chkNames:', this.removeVolumeTypeNames);
    if(this.removeVolumeTypeNames.length > 0 && !isUndefined(this.removeVolumeTypeNames) && this.removeFlag) {
      if(confirm("确认要移除？")){
        this.removeFlag = false;
        this.volumeTypeCreateService.removeVolumeTypesFromDb(this.removeVolumeTypeNames).subscribe(
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
      alert("请选择需要移除的存储类型！");
    }
  }

  check(id:number){
    if(id>=0){
      return true;
    }
    return false;
  }

}
