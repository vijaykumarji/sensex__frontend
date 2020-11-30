import { TestBed } from '@angular/core/testing';

import { SensexServiceService } from './sensex-service.service';

describe('SensexServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensexServiceService = TestBed.get(SensexServiceService);
    expect(service).toBeTruthy();
  });
});
