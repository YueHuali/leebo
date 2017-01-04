import { Component, OnInit } from '@angular/core';
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
          this.ngRouter.navigateByUrl('/cluster');
          // console.log('response:'+res.toString());
        },
        (error: Response) => {
          alert('删除失败！ message =' + error.json().message);
        }
      );
    }
  }

}
