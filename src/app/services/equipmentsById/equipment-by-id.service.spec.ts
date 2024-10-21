import { TestBed } from '@angular/core/testing';

import { EquipmentByIDService } from './equipment-by-id.service';

describe('EquipmentByIDService', () => {
  let service: EquipmentByIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentByIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
