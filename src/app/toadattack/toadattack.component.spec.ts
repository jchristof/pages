/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToadattackComponent } from './toadattack.component';

describe('ToadattackComponent', () => {
  let component: ToadattackComponent;
  let fixture: ComponentFixture<ToadattackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToadattackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToadattackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
