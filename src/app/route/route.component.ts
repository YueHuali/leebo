import { Component, OnInit } from '@angular/core';
import { RouteService } from '../shared/services/route.service';
import { Route } from './route';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
  providers: [
    RouteService
  ]
})
export class RouteComponent implements OnInit {
  routes: Route[];
  constructor(private routeService: RouteService) { }

  ngOnInit(): void {
    this.getRoute();
  }
  getRoute(): void {
    this.routeService.getRoutes().then(routes => this.routes = routes);
  }

}
