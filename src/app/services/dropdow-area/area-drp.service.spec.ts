import { TestBed } from '@angular/core/testing';

import { AreaDrpService } from './area-drp.service';

describe('AreaDrpService', () => {
  let service: AreaDrpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaDrpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
