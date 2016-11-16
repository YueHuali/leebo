import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-images-detail',
  templateUrl: './images-detail.component.html',
  styleUrls: ['./images-detail.component.scss']
})
export class ImagesDetailComponent implements OnInit {

  name: string;

  constructor(private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activeRoute.params.forEach((param: Params) => {
      this.name = param['name'];
    });
  }

}
