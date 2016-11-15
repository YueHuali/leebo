import { Component, OnInit } from '@angular/core';
import { Pod } from '../pod';

@Component({
  selector: 'pod-info',
  templateUrl: './pod-info.component.html',
  styleUrls: ['./pod-info.component.scss',
              '../../deployment/deployment-info/deployment-info.component.scss']
})
export class PodInfoComponent implements OnInit {
  pod: Pod = {name: 'mongodb-2-l6ev1', status: 'running', readyContainers: '1/1', restartContainers: 0, age: '7天'};

  constructor() { }

  ngOnInit() {
  }

}
