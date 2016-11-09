import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-monitor-info',
  templateUrl: './monitor-info.component.html',
  styleUrls: ['./monitor-info.component.css']
})
export class MonitorInfoComponent implements OnInit {
  @Input()
  monitorTarget:string;
  public isCollapsed = true;
  constructor() { }
  ngOnInit() {
  }

}
