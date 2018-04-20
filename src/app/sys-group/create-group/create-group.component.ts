import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'create-group',
  templateUrl: './create-group.component.html'
})
export class CreateGroupComponent implements OnInit {
  @Input() group: any;
  // @Output() onSave = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
