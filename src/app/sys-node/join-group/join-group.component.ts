import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'join-group',
  templateUrl: './join-group.component.html'
})
export class JoinGroupComponent implements OnInit {
  @Input() node: any;
  @Input() groupList: any;

  constructor() { }

  ngOnInit() {
  }

}
