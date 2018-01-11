import { Component, OnInit } from '@angular/core';
import {QuotaCheckService} from '../shared/services/quotaCheck.service';
import {HttpInterceptor} from '../shared/interceptor/HttpInterceptor';

@Component({
  selector: 'quota',
  templateUrl: './quotaCheck.component.html',
  styleUrls: ['./quotaCheck.component.scss'],
  providers: [ QuotaCheckService ]
})
export class QuotaCheckComponent implements OnInit {

  auditList: any = [];
  param: any;

  constructor(private http: HttpInterceptor,
                private quotaCheckService: QuotaCheckService) { }

  ngOnInit() {
    this.quotaCheckService.getCheckList().subscribe(res => this.auditList = res);
  }

  updateQuotaRecord(item: any) {
    this.param = item;
  }

}
