import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Overview3Component } from './overview3.component';

describe('Overview3Component', () => {
  let component: Overview3Component;
  let fixture: ComponentFixture<Overview3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Overview3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Overview3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
