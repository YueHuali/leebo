import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  target:string;
  selectType:string;
  buildIds:int[] = [];
  deploymentIds: int[] = [];
  Pod
  constructor() {
    this.target="target1";
    this.selectType = 'All';
  }

  toggle(id:string):void{

  }
  ngOnInit() {
  }

}
