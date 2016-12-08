/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewSphereComponent } from './new-sphere.component';

describe('NewSphereComponent', () => {
  let component: NewSphereComponent;
  let fixture: ComponentFixture<NewSphereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSphereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
