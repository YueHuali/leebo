import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../shared/services/organization.service';

@Component({
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  providers: [ OrganizationService ]
})
export class OrganizationComponent implements OnInit {

  organizations: any;

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getOrg().subscribe(
      response => this.organizations = response
    );
  }

}
