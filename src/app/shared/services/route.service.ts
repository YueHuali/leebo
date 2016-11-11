/**
 * Created by hexiuyu on 2016/11/11.
 */
import { Injectable } from '@angular/core';
import { Route } from '../../route/route';
import { ROUTES } from './mock-routes';
@Injectable()
export class RouteService {
  getRoutes(): Promise<Route[]> {
      return Promise.resolve(ROUTES);
  }
  findByName(name: string): Route {
    for (let route  of ROUTES) {
      if (name === route.name) {
        return route;
      }
    }
  }
  createRoute(route: Route): void {
    ROUTES.push(route);
  }
}
