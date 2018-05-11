/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrgGroupComponent } from './org-group.component';

describe('OrgGroupComponent', () => {
  let component: OrgGroupComponent;
  let fixture: ComponentFixture<OrgGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
