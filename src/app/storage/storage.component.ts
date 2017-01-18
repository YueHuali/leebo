import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../shared/services/storage.service';
import {Response} from '@angular/http';
import {TaskHandlerService} from '../shared/services/task-handler.service';
declare let jQuery;

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  providers: [ StorageService, TaskHandlerService ]
})
export class StorageComponent implements OnInit {

  volumns: any[];
  removeTitle: string = "删除存储";
  removeMsg: string = "正在删除中...";
  canShow: boolean = true;
  taskStatus: any;

  constructor(private storageService: StorageService, private taskService: TaskHandlerService, private ngRouter: Router) { }

  ngOnInit() {
    this.storageService.getStorages().subscribe(
      (data) => this.volumns = data.json().items
    );
  }

  removeVolume(name: string, shareId: string) {

    if(confirm('确定要删除该存储？')) {
      this.storageService.deleteStorage(shareId).subscribe(
        (res: Response) => {
          let taskId = this.taskService.getTaskId(res);
          let intId = setInterval(() => {
            this.taskService.checkProcess(taskId).subscribe(
              (data) => {
                this.taskStatus = data.json();
                if(this.taskStatus['task']['status'] === 3){
                  this.storageService.deletePV(name);
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
          alert('删除失败！ message =' + error.json().message);
        }
      );
    } else {
      this.canShow = false;
    }
  }
}
