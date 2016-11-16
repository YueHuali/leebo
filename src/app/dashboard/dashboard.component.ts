import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projects: any[];
  currentProject: String;

  ngOnInit() {
    this.projects = ['项目A', '项目B', '项目C'];
    this.currentProject = this.projects[0];
  }

  selectProject(project: string) {
    this.currentProject = project;
  }

}
