import { Injectable } from '@angular/core';
import { Project } from './project';
import { PROJECTS } from  './mock-projects';
@Injectable()
export class ProjectService {

  getProjects(): Promise<Project[]>{
    return Promise.resolve(PROJECTS);
  }

  createProject( project: Project): boolean{
    project.id=Math.random().toLocaleString();
    console.info('create project');
    console.info(project);
    PROJECTS.push(project);
    return true;
  }

  deleteProject(project: Project): boolean{
    console.info('delete project');
    console.info(project);
    PROJECTS.pop();
    return true;
  }

  findByName(name): Project{
    for (let item of PROJECTS){
      if(item.name===name){
        return item;
      }
    }
  }

  updateProject(project: Project): boolean{
    console.info('update project');
    console.info(project);
    return true;
  }

}
