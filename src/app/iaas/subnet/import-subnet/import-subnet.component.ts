import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-import-subnet',
  templateUrl: './import-subnet.component.html'
})
export class ImportSubnetComponent implements OnInit {
  @Input() importProectList: any;
  @Input() importSubnetList: any;
  @Output() onSave = new EventEmitter();
  importSubnetIds: any[] = [];
  subnetListInProject: any;

  constructor() {
  }

  ngOnInit() {
    // this.subnetListInProject = this.importSubnetList;
  }

  checkSubnetImport(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.importSubnetIds.push(id);
    } else {
      for (let i = 0; i < this.importSubnetIds.length; i++) {
        if (this.importSubnetIds[i] === id) {
          this.importSubnetIds.splice(i, 1);
          break;
        }
      }
    }
    this.onSave.emit(this.importSubnetIds);
    console.log(this.importSubnetIds);
  }

  /*selectProject(projectId: any) {
    this.subnetListInProject = this.importSubnetList;
    for (let i = 0; i < this.subnetListInProject.length; i++ ) {
        if(this.subnetListInProject[i].tenant_id != projectId){
          this.subnetListInProject.splice(i, 1);
        }
    }
  }*/

}
