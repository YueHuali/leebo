import {Component, OnInit} from '@angular/core';
import {ClusterService} from '../../shared/services/cluster.service';
import {Router} from '@angular/router';
import {Response} from '@angular/http';
import {TaskHandlerService} from '../../shared/services/task-handler.service';
declare let jQuery;

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  providers: [ClusterService, TaskHandlerService]
})
export class NodeComponent implements OnInit {

  name: string;
  ip: string;
  taskStatus: any;
  nodeTitle: string = "创建节点";
  nodeMsg: string = "正在创建中，请稍后...";
  canDisplay: boolean = false;

  constructor(private clusterService: ClusterService, private taskService: TaskHandlerService, private ngRouter: Router) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log("name=", this.name);
    console.log("ip=", this.ip);

    this.clusterService.createNode(this.name, this.ip).subscribe(
      (res: Response) => {
        console.log('cluster response from iaas: ', JSON.stringify(res));
        let taskId = this.taskService.getTaskId(res);
        let intId = setInterval(() => {
          this.taskService.checkProcess(taskId).subscribe(
            (data) => {
              this.taskStatus = data.json();
              if(this.taskStatus['task']['status'] === 3){
                let msg = JSON.parse(this.taskStatus['task']['message']);
                jQuery('#infoModal').modal('hide');
                this.ngRouter.navigateByUrl('/cluster');
                console.log('done msg=' + msg);
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

        this.canDisplay = true;
        jQuery('#infoModal').modal('show');
      },
      (error: Response) => {
        alert('创建失败！ message =' + error.json().message);
      }
    );
  }

}
