import { FactoryProvider } from '@angular/core';
import { XHRBackend, RequestOptions } from '@angular/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpInterceptor } from './HttpInterceptor';

/**
 * Created by John Zhang on 16/11/15.
 */
export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, userService: UserService, router: Router){
  return new HttpInterceptor(xhrBackend, requestOptions, userService, router);
}

export function provideHttpInterceptor(): FactoryProvider {

  return {
    provide: HttpInterceptor,
    useFactory: interceptorFactory,
    deps: [XHRBackend, RequestOptions, UserService, Router]
  };
}
