import { Component, OnInit, Input } from '@angular/core';
import { IaasProjectService } from '../../shared/services/iaasProject.service';


@Component({
  selector: 'project-name',
  templateUrl: './project-name.component.html',
  styleUrls: ['./project-name.component.scss'],
  providers: [ IaasProjectService ]
})
export class ProjectNameComponent implements OnInit {

  @Input() uuid: string;
  project: any;
  constructor(private iaasProjectService: IaasProjectService) { }

  ngOnInit() {
    this.iaasProjectService.getProjectNameByUuid(this.uuid).subscribe(res => this.project = res)
  }

}
