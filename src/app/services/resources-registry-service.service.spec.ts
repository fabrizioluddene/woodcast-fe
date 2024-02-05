import { TestBed } from '@angular/core/testing';

import { ResourcesRegistryServiceService } from './resources-registry-service.service';

describe('ResourcesRegistryServiceService', () => {
  let service: ResourcesRegistryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesRegistryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
