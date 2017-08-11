import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'import-floatingIp',
  templateUrl: './import-floatingIp.component.html'
})
export class ImportFloatingIpComponent implements OnInit {
  @Input() importFloatingIpList: any;
  @Output() onSave = new EventEmitter();
  importFloatingIpIds: any[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  checkFloatingIpImport(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.importFloatingIpIds.push(id);
    } else {
      for (let i = 0; i < this.importFloatingIpIds.length; i++) {
        if (this.importFloatingIpIds[i] === id) {
          this.importFloatingIpIds.splice(i, 1);
          break;
        }
      }
    }
    this.onSave.emit(this.importFloatingIpIds);
    console.log(this.importFloatingIpIds);
  }

}
