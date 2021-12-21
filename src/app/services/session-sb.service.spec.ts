import { TestBed } from '@angular/core/testing';

import { SessionSbService } from './session-sb.service';

describe('SessionSbService', () => {
  let service: SessionSbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionSbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
