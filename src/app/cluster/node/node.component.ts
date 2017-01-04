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

  constructor(private clusterService: ClusterService, private ngRouter: Router) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log('node name=',this.name);
    this.clusterService.createNode(this.name, this.ip).subscribe(
      (res: Response) => {
        this.ngRouter.navigateByUrl('/cluster');
        // console.log('response:'+res.toString());
      },
      (error: Response) => {
        alert('创建失败！ message =' + error.json().message);
      }
    );
  }

}
