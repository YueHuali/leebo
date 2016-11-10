import { Component, OnInit, Input} from '@angular/core';
import { Project } from '../../shared/services/project';
import { ProjectService } from '../../shared/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  providers: [ProjectService]
})
export class ProjectDetailComponent implements OnInit {

  projectService: ProjectService;

  project = new Project();

  router: Router;

  constructor(ps: ProjectService, router: Router) {
    this.projectService = ps;
    this.router = router;
  }

  ngOnInit() {
  }

  create(): void {
    var result = this.projectService.createProject(this.project);
    if(result){
      this.router.navigate(['/project']);
    }else{

    }
  }
}
