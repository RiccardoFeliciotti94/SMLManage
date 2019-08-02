import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBiddersPage } from './add-bidders.page';

describe('AddBiddersPage', () => {
  let component: AddBiddersPage;
  let fixture: ComponentFixture<AddBiddersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBiddersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBiddersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
