import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'import-router',
  templateUrl: './import-router.component.html'
})

export class ImportRouterComponent implements OnInit {
  @Input() importRouterList: any;
  @Output() onSave = new EventEmitter();
  importRouterIds: any[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  checkRouterImport(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.importRouterIds.push(id);
    } else {
      for (let i = 0; i < this.importRouterIds.length; i++) {
        if (this.importRouterIds[i] === id) {
          this.importRouterIds.splice(i, 1);
          break;
        }
      }
    }
    this.onSave.emit(this.importRouterIds);
    console.log(this.importRouterIds);
  }

}
