import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {StorageService} from "../shared/services/storage.service";
import {OrganizationService} from "../shared/services/organization.service";
import {Observable} from 'rxjs/Observable';
import any = jasmine.any;

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ OrganizationService ]
})
export class UserComponent implements OnInit {

  users: any;

  constructor(private userService: UserService , private organizationService: OrganizationService) { }

  ngOnInit() {
    this.organizationService.getUsers().subscribe(
      response => {
        this.users = response;
        this.users.body.forEach(user => {
          this.organizationService.getUserOrg(user.username).subscribe(res => {
           user.orgInfo = res;
          });
        });
      }
    );
  }





}
