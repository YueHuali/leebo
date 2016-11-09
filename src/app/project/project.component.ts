import {Component, OnInit} from '@angular/core';
import { Project } from './project';
import { ProjectService } from './project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit{
  projects: Project[];

  constructor(private projectService: ProjectService){}

  getProjects(): void {
    this.projectService.getProjects().then(projects => this.projects = projects);
  }

  ngOnInit(): void {
    this.getProjects();
  }


}
