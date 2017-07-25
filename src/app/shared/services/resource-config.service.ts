import { Injectable } from '@angular/core';
import {HttpInterceptor} from '../interceptor/HttpInterceptor';
import {Observable} from 'rxjs';
import {BASE_IAAS_SERVICE} from '../oc-info';

@Injectable()
export class ResourceConfigService {

  constructor(private http: HttpInterceptor) { }

  getImages(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/vmimages');
  }

  getIaasImages(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/images');
  }

  importImagesToDb(images: any[]) {

    let body = {"images": images};
    console.log('importImagesToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/vmimages', body);
  }

  removeImagesFromDb(imageIds: any[]) {

    let body = {"imageIds": imageIds};
    console.log('importImagesToDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/vmimages', {body: body});
  }

  getFlavors(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/flavours');
  }

  getIaasFlavors(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/flavours');
  }
}
