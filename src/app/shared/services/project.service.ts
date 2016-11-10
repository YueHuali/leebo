import { Injectable } from '@angular/core';
import { Project } from './project';
import { PROJECTS } from  './mock-projects';
@Injectable()
export class ProjectService {

  getProjects(): Promise<Project[]>{
    return Promise.resolve(PROJECTS);
  }

  createProject( project): boolean{
    PROJECTS.push(project);
    return true;
  }

  deleteProject(project): boolean{
    console.info(project);
    PROJECTS.pop();
    return true;
  }

}
