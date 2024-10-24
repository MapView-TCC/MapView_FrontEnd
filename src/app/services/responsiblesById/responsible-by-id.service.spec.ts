import { TestBed } from '@angular/core/testing';

import { ResponsibleByIDService } from './responsible-by-id.service';

describe('ResponsibleByIDService', () => {
  let service: ResponsibleByIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsibleByIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
