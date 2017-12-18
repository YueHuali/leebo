import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {VmImportService} from "../../../shared/services/iaas/vm-import.service";


@Component({
  selector: 'import-zone',
  templateUrl: './import-zone.component.html',
  providers: [VmImportService]
})

export class ImportZoneComponent implements OnInit {

  @Output() onSave = new EventEmitter();
  zoneName: any;
  zoneDisplayName: any;
  zones: any[];
  values: any[] = [];
  flag: boolean;

  constructor(private vmImportService: VmImportService) {
  }

  ngOnInit() {

  }

  exist(name: string) {
    if (this.zones) {
      for (let zone of this.zones) {
        if (zone.name === name) {
          return true;
        }
      }
    }
    return false;
  }

  check(event) {
    if (event|| this.exist(this.zoneName)) {
      this.flag = false;
    } else {
      this.flag = true;
    }
    let pair = {};
    pair['flag'] = this.flag;
    pair['name'] = this.zoneName;
    pair['displayName'] = this.zoneDisplayName;
    this.values.push(pair);
    this.onSave.emit(this.values);
    this.values = [];
    this.flag = false;
  }

}
