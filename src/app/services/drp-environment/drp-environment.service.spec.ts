import { TestBed } from '@angular/core/testing';

import { DrpEnvironmentService } from './drp-environment.service';

describe('DrpEnvironmentService', () => {
  let service: DrpEnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrpEnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
