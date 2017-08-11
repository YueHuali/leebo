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
    console.log('removeImagesFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/vmimages', {body: body});
  }

  getFlavors(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/flavours');
  }

  getIaasFlavors(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/resoruce/flavors');
  }

  getIaasFlavorById(flavorId: any): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/flavours/' + flavorId);
  }

  importFlavorsToDb(flavors: any[]) {

    let body = {"flavors": flavors};
    console.log('importlavorsToDb body=', body);
    return this.http.post(BASE_IAAS_SERVICE + '/flavours', body);
  }

  removeFlavorsFromDb(flavorIds: any[]) {

    let body = {"flavorIds": flavorIds};
    console.log('removeFlavorsFromDb body=', body);
    return this.http.delete(BASE_IAAS_SERVICE + '/flavours', {body: body});
  }

  getIaasProjects(): Observable<any> {
    return this.http.get(BASE_IAAS_SERVICE + '/projects');
  }
}
