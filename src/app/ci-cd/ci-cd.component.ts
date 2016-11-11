import { Component, OnInit } from '@angular/core';
import {CiCdService} from "../shared/services/cicd.service";
import {Template} from "./template";

@Component({
  selector: 'app-ci-cd',
  templateUrl: './ci-cd.component.html',
  styleUrls: ['./ci-cd.component.css'],
  providers:[
    CiCdService
  ]
})

export class CiCdComponent implements OnInit {

  target:string;
  selectType:string;
  templates: Template[] = [];

  constructor(private ciCdService:CiCdService) {
    this.target="target1";
    this.selectType = 'All';
  }

  toggle(id:string):void{

  }

  ngOnInit() {
    this.templates = this.ciCdService.getTemplates();
  }

}
