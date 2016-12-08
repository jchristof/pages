/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewprimitiveComponent } from './newprimitive.component';

describe('NewprimitiveComponent', () => {
  let component: NewprimitiveComponent;
  let fixture: ComponentFixture<NewprimitiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewprimitiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprimitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
