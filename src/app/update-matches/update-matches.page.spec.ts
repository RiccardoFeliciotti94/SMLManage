import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMatchesPage } from './update-matches.page';

describe('UpdateMatchesPage', () => {
  let component: UpdateMatchesPage;
  let fixture: ComponentFixture<UpdateMatchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMatchesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMatchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
