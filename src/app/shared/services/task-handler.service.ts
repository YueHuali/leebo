import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../interceptor/HttpInterceptor';
import { Observable } from 'rxjs';
import {BASE_OC_URI, BASE_IAAS_URI, BASE_TASK_URI} from '../oc-info';
import {Response} from '@angular/http';

@Injectable()
export class TaskHandlerService {

  constructor(private http: HttpInterceptor) { }

  getTaskId(res: Response): string {
    let taskJson = JSON.parse(res['_body']);
    console.log('response task:'+JSON.stringify(taskJson));
    console.log('response task id:'+taskJson['task']['id']);
    return taskJson['task']['id'];
  }

  checkProcess(taskId: string): Observable<any> {

    let taskUrl = BASE_TASK_URI.replace('taskId', taskId);
    console.log('taskUrl=', taskUrl);

    return this.http.get(taskUrl);
  }

}
