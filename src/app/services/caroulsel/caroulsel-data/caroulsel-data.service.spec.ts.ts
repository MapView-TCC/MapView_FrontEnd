import { TestBed } from '@angular/core/testing';

import { CaroulselDataService} from './caroulsel-data.service';

describe('EquipamentoService', () => {
  let service: CaroulselDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaroulselDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
