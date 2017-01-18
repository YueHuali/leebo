import {Component, OnInit, Input} from '@angular/core';
declare let jQuery;

@Component({
  selector: 'processbar',
  templateUrl: './processbar.component.html',
  styleUrls: ['./processbar.component.scss']
})
export class ProcessbarComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  msg: string;

  constructor() {
  }

  ngOnInit() {
  }

}
