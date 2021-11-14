import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail5Component } from './detail5.component';

describe('Detail5Component', () => {
  let component: Detail5Component;
  let fixture: ComponentFixture<Detail5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Detail5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
