import {Component, OnInit, Input} from '@angular/core';
import {Monitor} from "../monitor";

@Component({
  selector: 'app-monitor-info',
  templateUrl: './monitor-info.component.html',
  styleUrls: ['./monitor-info.component.css']
})
export class MonitorInfoComponent implements OnInit {
  @Input()
  monitorTarget:Monitor;
  public isCollapsed = true;
  constructor() { }
  ngOnInit() {
  }

}
