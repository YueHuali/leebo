import { PipeTransform, Pipe } from '@angular/core';
/**
 * Created by yuehl on 2017/4/17.
 */
@Pipe({name: 'iaasStatus'})
export class IaasStatusPipe implements PipeTransform {

  constructor() {
  }

  transform(status: string, ...args): string {
    let statusDesc = '创建中';
    if (status === '2') {
      statusDesc = '已失败';
    } else if (status === '3') {
      statusDesc = '已创建';
    }
    return statusDesc;//['创建中','已失败','已创建'][+status]
  }

}
