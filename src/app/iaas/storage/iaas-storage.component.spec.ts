/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IaasStorageComponent } from './iaas-storage.component';

describe('StorageComponent', () => {
  let component: IaasStorageComponent;
  let fixture: ComponentFixture<IaasStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IaasStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IaasStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
