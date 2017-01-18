import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../shared/services/storage.service';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import {TaskHandlerService} from '../../shared/services/task-handler.service';
declare let jQuery;

@Component({
  selector: 'app-storage-create',
  templateUrl: './storage-create.component.html',
  styleUrls: ['./storage-create.component.scss'],
  providers: [ StorageService, TaskHandlerService ]
})
export class StorageCreateComponent implements OnInit {

  name: string;
  size: number;
  type: string;
  taskStatus: any;

  constructor(private storageService: StorageService, private taskService: TaskHandlerService, private ngRouter: Router) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.storageService.createStorage(this.name, this.size, this.type).subscribe(
      (res: Response) => {
        console.log('storage response from iaas: ', JSON.stringify(res));
        let taskId = this.taskService.getTaskId(res);
        let intId = setInterval(() => {
          this.taskService.checkProcess(taskId).subscribe(
            (data) => {
              this.taskStatus = data.json();
              if(this.taskStatus['task']['status'] === 3){
                let msg = JSON.parse(this.taskStatus['task']['message']);
                this.storageService.createPV(this.name, this.size, msg['share']['id'], msg['share']['export_locations']);
                jQuery('#infoModal').modal('hide');
                this.ngRouter.navigateByUrl('/storage');
                console.log('done');
                clearInterval(intId);
              }else if(this.taskStatus['task']['status'] === 2){
                jQuery('#infoModal').modal('hide');
                this.ngRouter.navigateByUrl('/storage');
                console.log('failed');
                clearInterval(intId);
              }else {
                console.log('processing');
              }
            }
          );

        }, 20000);


      },
      (error: Response) => {
        alert('创建失败！ message =' + error.json().message);
      }
    );
  }
}
