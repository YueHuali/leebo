/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CiCdComponent } from './ci-cd.component';

describe('CiCdComponent', () => {
  let component: CiCdComponent;
  let fixture: ComponentFixture<CiCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
