import { TestBed } from '@angular/core/testing';

import { DrpBuildingService } from './drp-building.service';

describe('DrpBuildingService', () => {
  let service: DrpBuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrpBuildingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
