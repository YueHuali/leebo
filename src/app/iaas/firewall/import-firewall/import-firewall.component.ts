import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'import-firewall',
  templateUrl: './import-firewall.component.html'
})

export class ImportFirewallComponent implements OnInit {
  @Input() importFirewallList: any[];
  @Input() importProjectList: any[];
  @Output() onSave = new EventEmitter();
  importFirewallIds: any[] = [];
  orgName: any = "所有组织";

  constructor() {
  }

  ngOnInit() {
  }

  check(item:any){
    if(this.orgName==='所有组织'){
      return true;
    }else {
      if(this.orgName===item.projectName){
        return true;
      }
      return false;
    }
  }

  checkFirewallImport(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.importFirewallIds.push(id);
    } else {
      for (let i = 0; i < this.importFirewallIds.length; i++) {
        if (this.importFirewallIds[i] === id) {
          this.importFirewallIds.splice(i, 1);
          break;
        }
      }
    }
    this.onSave.emit(this.importFirewallIds);
    console.log(this.importFirewallIds);
  }

}
