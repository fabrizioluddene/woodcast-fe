import { TestBed } from '@angular/core/testing';

import { BatchRegistryService } from './batch-registry.service';

describe('BatchRegistryService', () => {
  let service: BatchRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
