import { TestBed } from '@angular/core/testing';

import { trackhistoryService} from './trackhistory.service';

describe('EquipamentoService', () => {
  let service: trackhistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(trackhistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
