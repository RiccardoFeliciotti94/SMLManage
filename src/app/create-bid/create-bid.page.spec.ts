import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBidPage } from './create-bid.page';

describe('CreateBidPage', () => {
  let component: CreateBidPage;
  let fixture: ComponentFixture<CreateBidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBidPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
