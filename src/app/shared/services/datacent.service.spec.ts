/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatacentService } from './datacent.service';

describe('Service: Datacent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatacentService]
    });
  });

  it('should ...', inject([DatacentService], (service: DatacentService) => {
    expect(service).toBeTruthy();
  }));
});
