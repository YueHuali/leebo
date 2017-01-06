import {Component, OnInit} from '@angular/core';
import {ClusterService} from '../shared/services/cluster.service';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss'],
  providers: [ ClusterService ]
})
export class ClusterComponent implements OnInit {

  nodes: any[];
  taskStatus: any;

  constructor(private clusterService: ClusterService, private ngRouter: Router) { }

  ngOnInit() {
    this.clusterService.getNodes().subscribe(
      (data) => this.nodes = data.json().items
    );
  }

  removeNode(name: string, host: string, ip: string) {
    if(confirm('确定要删除该节点？')) {
      this.clusterService.deleteNode(name, host, ip).subscribe(
        (res: Response) => {
          setInterval(function() {
            this.clusterService.checkProcess(res).subscribe(
              (data) => this.taskStatus = data.json()
            );
            if(this.taskStatus['task']['status'] === '3'){
              location.reload();
            }else {
              alert('deleting');
            }
          }, 20000);

          // this.ngRouter.navigateByUrl('/cluster');
        },
        (error: Response) => {
          alert('删除失败！ message =' + error.json().message);
        }
      );
    }
  }


}
