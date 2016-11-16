import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'builds-detail',
  templateUrl: './builds-detail.component.html',
  styleUrls: ['./builds-detail.component.scss']
})
export class BuildsDetailComponent implements OnInit {

  name: string;

  constructor(private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activeRoute.params.forEach((param: Params) => {
      this.name = param['name'];
    });
  }

}
