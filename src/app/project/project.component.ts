import {Component, OnInit} from '@angular/core';
import { Project } from '../shared/services/project';
import { ProjectService } from '../shared/services/project.service';
import {provideHttpInterceptor} from '../shared/interceptor/http-interceptor-provider';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService, provideHttpInterceptor()]
})
export class ProjectComponent implements OnInit {
  projects: Project[];

  constructor(private projectService: ProjectService) {}

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      (data) => this.projects = data
   );
  }

  ngOnInit(): void {
    this.getProjects();
  }


}
