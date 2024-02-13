import { TestBed } from '@angular/core/testing';

import { SharedDataLoginService } from './shared-data-login.service';

describe('SharedDataLoginService', () => {
  let service: SharedDataLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
