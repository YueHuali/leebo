import {Component, OnInit, ViewChild} from '@angular/core';
import {isUndefined} from 'util';
import { error } from 'util';
import { Response } from '@angular/http';
import {VmImportService} from "../../shared/services/iaas/vm-import.service";
import {ImportZoneComponent} from "./import-zone/import-zone.component";


@Component({
  selector: 'zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
  providers: [ VmImportService ]
})
export class ZoneComponent implements OnInit {

  zones: any[] = [];
  removeZoneNames: any[]=[];
  chkZoneNames: any[];
  importFlag: boolean = false;
  zone: any;
  zoneName: any;
  zoneDisplayName: any;
  newDisplayName: any;
  oldName: any;
  constructor(private vmImportService: VmImportService) { }

  ngOnInit() {
    this.vmImportService.getVmZones().subscribe(
      (data) => this.zones = data.json()
    );
  }

  saveChkZoneNames(chkNames: any) {
    this.importFlag = chkNames[0]['flag'];
    this.zoneDisplayName = chkNames[0]['displayName'];
    this.zoneName = chkNames[0]['name'];

  }

  importZoneSubmit() {
    this.vmImportService.importZone(this.zoneName, this.zoneDisplayName).subscribe(
      res => {
        location.reload();
      },
      error => {
        let errorData = error.json();
        alert(errorData['message']);
      }
    );
  }

  changeName(id: any) {
    let changeZone;
    this.vmImportService.findZoneById(id).subscribe(
      response => {
        changeZone = response.json();
        this.oldName = changeZone.name;
      }
    );
    window['$']('#changeNameModal').modal('show');
  }

  changeNameSubmit() {
    this.vmImportService.updateZone(this.newDisplayName, this.oldName ).subscribe(
      (data) => {
        location.reload();
      },error => {
        const errorData = error.json();
        alert(errorData['message']);
      }
    );
  }

  resetZoneNames() {
    this.chkZoneNames = [];
    console.log('resetZoneNames chkNames:', this.chkZoneNames);
  }

  checkZoneRemove(event, name) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeZoneNames.push(name);
    } else {
      for (let i = 0; i < this.removeZoneNames.length; i++) {
        if (this.removeZoneNames[i] === name) {
          this.removeZoneNames.splice(i, 1);
          break;
        }
      }
    }
  }

  removeZones() {
    console.log('Remove zone chkIds:', this.removeZoneNames);
    if(this.removeZoneNames.length > 0 && !isUndefined(this.removeZoneNames) && this.removeZoneNames) {
      if(confirm("确认要移除？")) {
        this.vmImportService.removeZonesFromDb(this.removeZoneNames).subscribe(
          res => {
            if (res.json() && !res.json()['success']) {
              alert(res.json()['message']);
            } else {
              location.reload();
            }
          },
          error => {
            let errorData = error.json();
            alert(errorData['message']);
          }
        );
      }
    }else {
        alert("请选择需要移除的区域");
      }
    }

}
