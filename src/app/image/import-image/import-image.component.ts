import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'import-image',
  templateUrl: './import-image.component.html',
  styleUrls: ['./import-image.component.scss']
})
export class ImportImageComponent implements OnInit {
  @Input() importImageList: any;
  @Output() onSave = new EventEmitter();
  importImageIds: any[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  checkImageImport(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.importImageIds.push(id);
    } else {
      for (let i = 0; i < this.importImageIds.length; i++) {
        if (this.importImageIds[i] === id) {
          this.importImageIds.splice(i, 1);
          break;
        }
      }
    }
    this.onSave.emit(this.importImageIds);
    console.log(this.importImageIds);
  }

}
