import { TestBed } from '@angular/core/testing';

import { TrackingHistoryService } from './tracking-history.service';

describe('TrackingHistoryService', () => {
  let service: TrackingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
