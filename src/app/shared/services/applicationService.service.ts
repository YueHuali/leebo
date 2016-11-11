import {Injectable} from '@angular/core';
import {ApplicationService} from './applicationService';
import {APP_SERVICES} from './mock-applicationServices';

@Injectable()
export class ApplicationServiceService {
  getApplicationServices(): Promise<ApplicationService[]> {
    return Promise.resolve(APP_SERVICES);
  }

  findByName(name: string): ApplicationService {
    for (let item of APP_SERVICES){
      if (item.name === name) {
        return item;
      }
    }
  }
}
