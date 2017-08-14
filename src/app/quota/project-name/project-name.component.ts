import { Component, OnInit, Input } from '@angular/core';
import { IaasProjectService } from '../../shared/services/iaasProject.service';
import { OrganizationService } from '../../shared/services/organization.service';


@Component({
  selector: 'project-name',
  templateUrl: './project-name.component.html',
  styleUrls: ['./project-name.component.scss'],
  providers: [ IaasProjectService, OrganizationService]
})
export class ProjectNameComponent implements OnInit {

  @Input() uuid: string;
  projectName: any;
  org: any;
  constructor(private iaasProjectService: IaasProjectService, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.iaasProjectService.getProjectNameByUuid(this.uuid).subscribe(res => {
      this.projectName = res.name;
      this.organizationService.getOrgByName(this.projectName).subscribe(res => {
        this.org = res;
      })
    })
  }

}
