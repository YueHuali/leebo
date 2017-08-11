/**
 * Created by xzhao on 2017/8/10.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'quotaStatus'})
export class QuotaStatus implements PipeTransform {

  constructor() {}

  transform(status: any, ...args): string {
    let statusDesc = '待审核';
    switch( status ) {
      case 0 :
        break;
      case 1 :
        statusDesc = '已通过';
        break;
      case 2 :
        statusDesc = '已拒绝';
        break;
    }
    return statusDesc;
  }
}
