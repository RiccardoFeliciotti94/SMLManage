import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertBiddersPage } from './insert-bidders.page';

describe('InsertBiddersPage', () => {
  let component: InsertBiddersPage;
  let fixture: ComponentFixture<InsertBiddersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertBiddersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertBiddersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
