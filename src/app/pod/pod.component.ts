import { Component, OnInit } from '@angular/core';
import { Pod } from './pod';

@Component({
  selector: 'app-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['./pod.component.scss']
})
export class PodComponent implements OnInit {

  pods: Pod[] = [
    {name: 'mongodb-2-l6ev1', status: 'running', readyContainers: '1/1', restartContainers: 0, age: '7天'},
    {name: 'nodejs-mongodb-example-1-1465d', status: 'completed', readyContainers: '0/1', restartContainers: 0, age: '7天'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
