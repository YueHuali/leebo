import { Component, OnInit } from '@angular/core';
import {ResourceConfigService} from '../shared/services/resource-config.service';
import {Image} from './image';
import {isUndefined} from 'util';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  providers: [ ResourceConfigService ]
})

export class ImageComponent implements OnInit {

  images: any[];
  chkImageIds: any[];
  imageList: any[];
  importFlag: boolean = true;
  removeFlag: boolean = true;

  removeImageIds: any[] = [];

  constructor(private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.resourceConfigService.getImages().subscribe(
      (data) => this.images = data.json()
    );

    this.resourceConfigService.getIaasImages().subscribe(
      (data) => {
        this.imageList = data.json().images;
        for (let importImage of this.imageList) {
          for (let image of this.images) {
            if(importImage.id === image.id){
              importImage.isUsed = 'true';
            }
          }
        }
      }
    );
  }

  saveChkImageIds(chkIds) {
    console.log('saveChkImageIds chkIds:', chkIds);
    this.chkImageIds = chkIds;
  }

  resetImageIds() {
    this.chkImageIds = [];
    console.log('resetImageIds chkIds:', this.chkImageIds);
  }

  importImageSubmit() {
    console.log('importImageSubmit chkIds:', this.chkImageIds);
    if(this.chkImageIds.length > 0 && !isUndefined(this.chkImageIds)) {
      this.importFlag = false;
      let images = this.transformImage();
      this.resourceConfigService.importImagesToDb(images).subscribe(
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

  transformImage(): any[] {
    let images = new Array();
    for (let i = 0; i < this.chkImageIds.length; i++) {
      for (let j = 0; j < this.imageList.length; j++) {
        if(this.chkImageIds[i] === this.imageList[j].id) {
          let image = new Image();
          image.id = this.chkImageIds[i];
          image.name = this.imageList[j].name;
          image.size = this.imageList[j].size;
          images.push(image);
          console.log('image=', JSON.stringify(image));
          break;
        }
      }
    }
    return images;
  }

  checkImageRemove(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeImageIds.push(id);
    } else {
      for (let i = 0; i < this.removeImageIds.length; i++) {
        if (this.removeImageIds[i] === id) {
          this.removeImageIds.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.removeImageIds);
  }

  removeImage() {
    console.log('Remove image chkIds:', this.removeImageIds);
    if(this.removeImageIds.length > 0 && !isUndefined(this.removeImageIds) && this.removeFlag) {
      if(confirm("确认要移除？")){
        this.removeFlag = false;
        this.resourceConfigService.removeImagesFromDb(this.removeImageIds).subscribe(
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
