/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditCameraComponent } from './edit-camera.component';

describe('EditCameraComponent', () => {
  let component: EditCameraComponent;
  let fixture: ComponentFixture<EditCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
