import { TestBed } from '@angular/core/testing';

import { CarrosselService} from './carrossel.service';

describe('EquipamentoService', () => {
  let service: CarrosselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrosselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
