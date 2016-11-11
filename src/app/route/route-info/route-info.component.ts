import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouteService } from '../../shared/services/route.service';
import { Route } from '../route';

@Component({
  selector: 'app-route-info',
  templateUrl: './route-info.component.html',
  styleUrls: ['./route-info.component.scss'],
  providers: [RouteService]
})
export class RouteInfoComponent implements OnInit {
  appRoute: Route;

  constructor(private route: ActivatedRoute,
              private routeService: RouteService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let name = params['name'];
      this.appRoute = this.routeService.findByName(name);
    });
    console.log(this.appRoute);
  }

}
