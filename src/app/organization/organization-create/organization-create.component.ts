import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../shared/services/organization.service';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.scss'],
  providers: [OrganizationService]
})
export class OrganizationCreateComponent implements OnInit {

  orgName: string;
  orgAdmin: string = '';
  orgDisplayName: string;
  orgRemark: string;
  orgs: any;
  users: any;
  constructor(private organizationService: OrganizationService, private ngRouter: Router) { }

  ngOnInit() {
    this.organizationService.getOrg().subscribe(
      response => this.orgs = response.body
    );
    this.organizationService.getUsers().subscribe(
      response => {
        this.users = response.body;
      }
    );
  }

  onSubmit() {
    this.organizationService.createOrg(this.orgName, this.orgAdmin, this.orgDisplayName, this.orgRemark).subscribe(
      (res: Response) => {
        this.ngRouter.navigateByUrl('/organization');
      },
      (error: Response) => {
        alert('创建失败！ message =' + error.json().message);
      }
    );
  }

  exist(name: string) {
    if (this.orgs){
      for (const org of this.orgs){
        if(org.name === name){
          return true;
        }
      }
    }
    return false;
  }

}
