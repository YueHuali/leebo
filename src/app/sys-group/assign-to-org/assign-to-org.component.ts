import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'assign-to-org',
  templateUrl: 'assign-to-org.component.html'
})
export class AssignToOrgComponent implements OnInit {

  @Input() orgs: any;
  @Input() org: any;

  constructor() { }

  ngOnInit() {

  }

}
