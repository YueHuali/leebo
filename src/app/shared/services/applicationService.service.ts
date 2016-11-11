import {Injectable} from '@angular/core';
import {ApplicationService} from './applicationService';
import {APP_SERVICES} from './mock-applicationServices';

@Injectable()
export class ApplicationServiceService {
  getApplicationServices(): Promise<ApplicationService[]> {
    return Promise.resolve(APP_SERVICES);
  }
}
