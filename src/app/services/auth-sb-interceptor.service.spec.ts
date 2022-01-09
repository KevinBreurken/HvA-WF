import { TestBed } from '@angular/core/testing';

import { AuthSbInterceptorService } from './auth-sb-interceptor.service';

describe('AuthSbInterceptorService', () => {
  let service: AuthSbInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSbInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
