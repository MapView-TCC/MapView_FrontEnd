import { TestBed } from '@angular/core/testing';

import { EnviromentDrpService } from './enviroment-drp.service';

describe('EnviromentDrpService', () => {
  let service: EnviromentDrpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviromentDrpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
