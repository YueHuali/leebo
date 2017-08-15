import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'import-vm',
  templateUrl: './import-vm.component.html'
})

export class ImportVmComponent implements OnInit {
  @Input() importVmList: any;
  @Output() onSave = new EventEmitter();
  importVmIds: any[] = [];

  constructor() {
  }

  ngOnInit() {
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
