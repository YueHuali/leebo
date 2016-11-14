import { Injectable } from '@angular/core';
import {Datacent} from './datacent';

@Injectable()
export class DatacentService {

  constructor() { }

  getDatacents(): Datacent[] {
    return [{name: '北京'}, {name: '上海'}, {name: '广州'}];
  }
}
