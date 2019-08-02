import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayersPage } from './add-players.page';

describe('AddPlayersPage', () => {
  let component: AddPlayersPage;
  let fixture: ComponentFixture<AddPlayersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
