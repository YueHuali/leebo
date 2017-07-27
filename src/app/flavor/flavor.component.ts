import {Component, OnInit} from '@angular/core';
import {ResourceConfigService} from '../shared/services/resource-config.service';

@Component({
  selector: 'flavor',
  templateUrl: './flavor.component.html',
  styleUrls: ['./flavor.component.scss'],
  providers: [ ResourceConfigService ]
})
export class FlavorComponent implements OnInit {

  flavors: any[];
  chkFlavorIds: any[];
  flavorList: any[];

  removeFlavorIds: any[] = [];

  constructor(private resourceConfigService: ResourceConfigService) { }

  ngOnInit() {
    this.resourceConfigService.getFlavors().subscribe(
      (data) => this.flavors = data.json()
    );

    this.resourceConfigService.getIaasFlavors().subscribe(
      (data) => this.flavorList = data.json().flavors
    );
  }

  saveChkFlavorIds(chkIds) {
    console.log('saveChkFlavorIds chkIds:', chkIds);
    this.chkFlavorIds = chkIds;
  }

  resetFlavorIds() {
    this.chkFlavorIds = [];
    console.log('resetFlavorIds chkIds:', this.chkFlavorIds);
  }

  importFlavorSubmit() {
    console.log('importFlavorSubmit chkIds:', this.chkFlavorIds);
    if(this.chkFlavorIds.length > 0) {
      this.resourceConfigService.importFlavorsToDb(this.chkFlavorIds).subscribe(
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

  checkFlavorRemove(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeFlavorIds.push(id);
    } else {
      for (let i = 0; i < this.removeFlavorIds.length; i++) {
        if (this.removeFlavorIds[i] === id) {
          this.removeFlavorIds.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.removeFlavorIds);
  }

  removeFlavor() {
    console.log('Remove flavor chkIds:', this.removeFlavorIds);
    if(this.removeFlavorIds.length > 0) {
      if(confirm("确认要移除？")){
        this.resourceConfigService.removeFlavorsFromDb(this.removeFlavorIds).subscribe(
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