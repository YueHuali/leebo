import { Component, OnInit, Input} from '@angular/core';
import { Project } from '../../shared/services/project';
import { ProjectService } from '../../shared/services/project.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  providers: [ProjectService]
})
export class ProjectDetailComponent implements OnInit {

  projectService: ProjectService;

  project: Project;

  new_flag: boolean;

  constructor(ps: ProjectService, private ar: ActivatedRoute) {
    this.projectService = ps;
  }

  ngOnInit() {
    this.ar.params.forEach((param: Params) => {
      console.info(param);
      if(param.hasOwnProperty('name')){
        this.new_flag = false;
        this.project = this.projectService.findByName(param['name']);
      }else{
        this.new_flag = true;
        this.project = new Project();
      }
    });
  }

  submit(): void {
    let result: boolean;
    if(this.project.hasOwnProperty('id')){
      result = this.projectService.updateProject(this.project);
    }else{
      result = this.projectService.createProject(this.project);
    }

    if(result){
      // this.router.navigate(['/project']);
    }else{

    }
  }
}
