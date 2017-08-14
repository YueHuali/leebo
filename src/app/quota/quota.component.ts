import { Component, OnInit } from '@angular/core';
import { QuotaService } from '../shared/services/quota.service';

@Component({
  selector: 'quota',
  templateUrl: './quota.component.html',
  styleUrls: ['./quota.component.scss'],
  providers: [ QuotaService ]
})
export class QuotaComponent implements OnInit {

  quotaDefault: any = {};
  newQuotaDefault: any = {};
  auditList: any = [];
  result: any = [];

  constructor(private quotaService: QuotaService) { }

  ngOnInit() {
    this.getDefaultQuota();
    this.quotaService.getAuditList().subscribe(res => this.auditList = res);
  }

  updateQuotaRecord(flag: any,item: any) {
    item.apply = flag;
    this.quotaService.updateQuotaRecord(item).subscribe();
  }

  updateDefault() {
    let countNum = 0;
    for (const object of this.result) {
      const name = object['key'];
      if (this.newQuotaDefault[name] === object['value']) {
        countNum++;
      }
    }
    if (countNum != this.result.length) {
      this.quotaService.updateDefault(this.newQuotaDefault).subscribe(
        res => {
          window['$']('#updateDefaultQuota').modal('hide');
          this.getDefaultQuota();
        }
      );
    }else{
      window['$']('#updateDefaultQuota').modal('hide');
    }
  }

  getDefaultQuota() {
    this.quotaService.getDefault().subscribe(res => {
      this.quotaDefault = res;
      for (const field in this.quotaDefault) {
        if (this.quotaDefault.hasOwnProperty(field)) {
          this.result.push({
            key: field,
            value: this.quotaDefault[field]
          });
          this.newQuotaDefault[field] = this.quotaDefault[field];
        }
      };
    });
  }

  tabDefault() {
    window['$']('#pills-home-tab').tab('show');
  }

  tabAuditList() {
    window['$']('#pills-profile-tab').tab('show');
  }
}
