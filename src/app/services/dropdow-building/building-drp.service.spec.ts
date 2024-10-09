import { TestBed } from '@angular/core/testing';

import { BuildingDrpService } from './building-drp.service';

describe('BuildingDrpService', () => {
  let service: BuildingDrpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingDrpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
