import { Injectable } from '@angular/core';
import { Project } from './project';
import { PROJECTS } from  './mock-projects';
import {HttpInterceptor} from '../interceptor/HttpInterceptor';
import {Response} from '@angular/http';
import {BASE_OC_URI} from '../oc-info';

@Injectable()
export class ProjectService {


  constructor(private http: HttpInterceptor) {}

  getProjects() {
   return this.http.get(BASE_OC_URI + '/oapi/v1/projects').map(
      (response: Response) => this.parseJsonToProjects(response.json())
    );
  }

  createProject( project: Project): boolean {
    project.id=Math.random().toLocaleString();
    console.info('create project');
    console.info(project);
    PROJECTS.push(project);
    return true;
  }

  deleteProject(project: Project): boolean {
    console.info('delete project');
    console.info(project);
    PROJECTS.pop();
    return true;
  }

  findByName(name) {
   return this.http.get(BASE_OC_URI + '/oapi/v1/projects/' + name).map(
     (response: Response) => this.parseJsonToProject(response.json())
   );
  }

  updateProject(project: Project): boolean {
    console.info('update project');
    console.info(project);
    return true;
  }

  parseJsonToProjects(json): Project[] {
    let pros = new Array();
    if (json.items.length > 0) {
      for (let item of json.items) {
       let project = this.parseJsonToProject(item);
        pros.push(project);
      }
    }
    return pros;
  }

  parseJsonToProject(json): Project {
    let project = new Project();
    project.id = json.metadata.uid;
    project.name = json.metadata.name;
    project.description = json.metadata.annotations['openshift.io/description'];
    project.display_name = json.metadata.annotations['openshift.io/display-name'];
    return project;
  }
}
