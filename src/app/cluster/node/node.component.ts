import {Component, OnInit} from '@angular/core';
import {ClusterService} from '../../shared/services/cluster.service';
import {Router} from '@angular/router';
import {Response} from '@angular/http';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  providers: [ClusterService]
})
export class NodeComponent implements OnInit {

  name: string;
  ip: string;
  taskStatus: any;

  constructor(private clusterService: ClusterService, private ngRouter: Router) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log('node name=',this.name);
    this.clusterService.createNode(this.name, this.ip).subscribe(
      (res: Response) => {
        setInterval(function() {
          this.clusterService.checkProcess(res).subscribe(
            (data) => this.taskStatus = data.json()
          );
          if(this.taskStatus['task']['status'] === '3'){
            this.ngRouter.navigateByUrl('/storage');
          }
        }, 20000);
      },
      (error: Response) => {
        alert('创建失败！ message =' + error.json().message);
      }
    );
  }

}
