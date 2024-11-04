import { TestBed } from '@angular/core/testing';

import { ResponsibleByEquipmentService } from './responsible-by-id.service';

describe('ResponsibleByEquipmentService', () => {
  let service: ResponsibleByEquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsibleByEquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
