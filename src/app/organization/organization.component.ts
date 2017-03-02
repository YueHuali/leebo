import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../shared/services/organization.service';
import { error } from 'util';
import { Response } from '@angular/http';

@Component({
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  providers: [ OrganizationService ]
})
export class OrganizationComponent implements OnInit {

  organizations: any;
  users: any;

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.getOrg();
  }

  removeOrg(orgName: string) {
    this.organizationService.getProjectsByOrg(orgName).subscribe(
      (data) => {
        console.log(data.json())
        if (data.json()['items'].length > 0) {
          alert('组织下含有未删除的项目！');
        }else{
          let flag: boolean = confirm('确定要解散？');

          if(flag) {
            this.organizationService.getUserByOrg(orgName).subscribe(
              response => {
                this.users = response;
                for (let i = 0; i < this.users.items.length; i++) {
                  let user = this.users.items[i].metadata.name;
                  this.organizationService.leaveOrg(user, orgName).subscribe();
                }
              }
            );

            this.organizationService.removeOrg(orgName).subscribe(
              (res: Response) => {
                this.getOrg();
              },
              (error: Response) => {
                alert('删除失败！ message =' + error.json().message);
              }
            );
          }
        }
      }
    );
  }

  getOrg() {
    this.organizationService.getOrg().subscribe(
      response => this.organizations = response
    );
  }

}
