import { TestBed } from '@angular/core/testing';

import { DrpAreaService } from './drp-area.service';

describe('DrpAreaService', () => {
  let service: DrpAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrpAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
