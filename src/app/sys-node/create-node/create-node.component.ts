import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'create-node',
  templateUrl: './create-node.component.html'
})
export class CreateNodeComponent implements OnInit {
  @Input() node: any;
  @Input() groupList: any;

  constructor() { }

  ngOnInit() {
  }

}
