/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CliComponent } from './cli.component';

describe('CliComponent', () => {
  let component: CliComponent;
  let fixture: ComponentFixture<CliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
