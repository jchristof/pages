/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GbaComponent } from './gba.component';

describe('GbaComponent', () => {
  let component: GbaComponent;
  let fixture: ComponentFixture<GbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
