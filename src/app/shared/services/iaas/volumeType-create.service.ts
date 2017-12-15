import {Injectable} from '@angular/core';
import {HttpInterceptor} from '../../interceptor/HttpInterceptor';
import {Observable} from 'rxjs';
import { BASE_IAAS_SERVICE } from '../../oc-info';

@Injectable()
export class VolumeTypeCreateService {
  constructor(private http: HttpInterceptor) {
  }

  getVolumeTypes(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/volumeTypes');
  }


  createVolumeType(volumeType: any[]) {
    let body = volumeType;
    console.log('addVolumeTypeToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/createVolumeType', body);
  }

  removeVolumeTypesFromDb(volumeTypeNames: any[]) {
    let body = {"volumeTypeNames": volumeTypeNames};
    console.log('removeVolumeTypeFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/removeVolumeTypes', {body: body});
  }

}
