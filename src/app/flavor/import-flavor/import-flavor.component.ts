import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'import-flavor',
  templateUrl: './import-flavor.component.html',
  styleUrls: ['./import-flavor.component.scss']
})
export class ImportFlavorComponent implements OnInit {
  @Input() importFlavorList: any;
  @Output() onSave = new EventEmitter();
  importFlavorIds: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  checkFlavorImport(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.importFlavorIds.push(id);
    } else {
      for (let i = 0; i < this.importFlavorIds.length; i++) {
        if (this.importFlavorIds[i] === id) {
          this.importFlavorIds.splice(i, 1);
          break;
        }
      }
    }
    this.onSave.emit(this.importFlavorIds);
    console.log(this.importFlavorIds);
  }
}
