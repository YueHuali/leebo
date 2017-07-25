import { Component, OnInit } from '@angular/core';
import {ResourceConfigService} from '../shared/services/resource-config.service';
import {Image} from './image';

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

  removeImageIds: any[] = [];

  constructor(private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.resourceConfigService.getImages().subscribe(
      (data) => this.images = data.json()
    );

    this.resourceConfigService.getIaasImages().subscribe(
      (data) => this.imageList = data.json().images
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
    if(this.chkImageIds.length > 0) {
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
    if(this.removeImageIds.length > 0) {
      if(confirm("确认要移除？")){
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
    }
  }

}
