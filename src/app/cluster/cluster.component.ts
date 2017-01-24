import {Component, OnInit} from '@angular/core';
import {ClusterService} from '../shared/services/cluster.service';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import {TaskHandlerService} from '../shared/services/task-handler.service';
declare let jQuery;

@Component({
  selector: 'cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss'],
  providers: [ ClusterService, TaskHandlerService ]
})
export class ClusterComponent implements OnInit {

  nodes: any[];
  removeTitle: string = "删除节点";
  removeMsg: string = "正在删除中...";
  canShow: boolean = true;
  taskStatus: any;

  constructor(private clusterService: ClusterService, private taskService: TaskHandlerService, private ngRouter: Router) { }

  ngOnInit() {
    this.clusterService.getNodes().subscribe(
      (data) => this.nodes = data.json().items
    );
  }

  removeNode(name: string, host: string, ip: string) {
    if(confirm('确定要删除该节点？')) {
      this.clusterService.deleteNode(name, host, ip).subscribe(
        (res: Response) => {
          let taskId = this.taskService.getTaskId(res);
          let intId = setInterval(() => {
            this.taskService.checkProcess(taskId).subscribe(
              (data) => {
                this.taskStatus = data.json();
                if(this.taskStatus['task']['status'] === 3){
                  jQuery('#infoModal').modal('hide');
                  this.ngRouter.navigateByUrl('/cluster');
                  console.log('done');
                  clearInterval(intId);
                }else if(this.taskStatus['task']['status'] === 2){
                  jQuery('#infoModal').modal('hide');
                  this.ngRouter.navigateByUrl('/cluster');
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
    }
  }


}
