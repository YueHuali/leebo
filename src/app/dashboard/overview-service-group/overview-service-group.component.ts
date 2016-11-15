import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'overview-service-group',
  templateUrl: 'overview-service-group.component.html',
  styleUrls: ['overview-service-group.component.scss']
})
export class ServiceGroupComponent implements OnInit {

  serviceList: any[];
  public isCollapsed = false;

  constructor() { }

  ngOnInit() {
  }
}
