import { Component, OnInit, Input } from '@angular/core';
import {Template} from '../template';

@Component({
  selector: 'app-template-info',
  templateUrl: './template-info.component.html',
  styleUrls: ['./template-info.component.scss']
})

export class TemplateInfoComponent implements OnInit {
  @Input()
  templateTarget:Template;

  constructor() { }

  ngOnInit() {
  }

}
