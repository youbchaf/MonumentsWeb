import { TestBed } from '@angular/core/testing';

import { MonumentsService } from './monuments.service';

describe('MonumentsService', () => {
  let service: MonumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
