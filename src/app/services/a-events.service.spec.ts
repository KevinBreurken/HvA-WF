import { TestBed } from '@angular/core/testing';

import { AEventsService } from './a-events.service';

describe('AEventsService', () => {
  let service: AEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
