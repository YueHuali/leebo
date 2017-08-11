import {Component, OnInit} from '@angular/core';
import {Firewall} from './firewall';
import {isUndefined} from 'util';
import {FirewallImportService} from '../../shared/services/iaas/firewall-import.service';

@Component({
  selector: 'firewall',
  templateUrl: './firewall.component.html',
  styleUrls: ['./firewall.component.scss'],
  providers: [ FirewallImportService ]
})

export class FirewallComponent implements OnInit {

  firewalls: any[];
  chkFirewallIds: any[];
  firewallList: any[];
  importFlag: boolean = true;
  removeFlag: boolean = true;

  removeFirewallIds: any[] = [];

  constructor(private firewallImportService: FirewallImportService) { }

  ngOnInit() {
    this.firewallImportService.getFirewalls().subscribe(
      (data) => this.firewalls = data.json()
    );

    this.firewallImportService.getIaasFirewalls().subscribe(
      (data) => {
        this.firewallList = data.json().security_groups;
        for (let importFirewall of this.firewallList) {
          for (let firewall of this.firewalls) {
            if(importFirewall.id === firewall.id){
              importFirewall.isUsed = 'true';
            }
          }
        }
      }
    );
  }

  saveChkFirewallIds(chkIds) {
    console.log('saveChkFirewallIds chkIds:', chkIds);
    this.chkFirewallIds = chkIds;
  }

  resetFirewallIds() {
    this.chkFirewallIds = [];
    console.log('resetFirewallIds chkIds:', this.chkFirewallIds);
  }

  importFirewallSubmit() {
    console.log('importFirewallSubmit chkIds:', this.chkFirewallIds);
    if(this.chkFirewallIds.length > 0 && !isUndefined(this.chkFirewallIds)) {
      this.importFlag = false;
      let firewalls = this.transformFirewall();
      this.firewallImportService.importFirewallsToDb(firewalls).subscribe(
        res => {
          location.reload();
        },
        error => {
          let errorData = error.json();
          alert(errorData['message']);
        }
      );
    }else{
      alert("请选择需要导入的防火墙");
    }
  }

  transformFirewall(): any[] {
    let firewalls = new Array();
    for (let i = 0; i < this.chkFirewallIds.length; i++) {
      for (let j = 0; j < this.firewallList.length; j++) {
        if(this.chkFirewallIds[i] === this.firewallList[j].id) {
          let firewall = new Firewall();
          firewall.id = this.chkFirewallIds[i];
          firewall.name = this.firewallList[j].name;
          firewall.tenant_id = this.firewallList[j].tenant_id;
          firewalls.push(firewall);
          console.log('firewall=', JSON.stringify(firewall));
          break;
        }
      }
    }
    return firewalls;
  }

  checkFirewallRemove(event, id) {
    let checked = event.target.checked;
    if (checked === true) {
      this.removeFirewallIds.push(id);
    } else {
      for (let i = 0; i < this.removeFirewallIds.length; i++) {
        if (this.removeFirewallIds[i] === id) {
          this.removeFirewallIds.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.removeFirewallIds);
  }

  removeFirewall() {
    console.log('Remove firewall chkIds:', this.removeFirewallIds);
    if(this.removeFirewallIds.length > 0 && !isUndefined(this.removeFirewallIds) && this.removeFlag) {
      if(confirm("确认要移除？")){
        this.removeFlag = false;
        this.firewallImportService.removeFirewallsFromDb(this.removeFirewallIds).subscribe(
          res => {
            location.reload();
          },
          error => {
            let errorData = error.json();
            alert(errorData['message']);
          }
        );
      }
    }else{
      alert("请选择需要移除的防火墙");
    }
  }

}
