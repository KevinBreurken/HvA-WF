import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Overview5Component } from './overview5.component';

describe('Overview5Component', () => {
  let component: Overview5Component;
  let fixture: ComponentFixture<Overview5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Overview5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Overview5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
