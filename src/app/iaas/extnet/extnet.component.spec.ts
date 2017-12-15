/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExtnetComponent } from './extnet.component';

describe('ExtnetComponent', () => {
  let component: ExtnetComponent;
  let fixture: ComponentFixture<ExtnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtnetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
