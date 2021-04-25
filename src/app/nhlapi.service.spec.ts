import { TestBed } from '@angular/core/testing';

import { NhlapiService } from './nhlapi.service';

describe('NhlapiService', () => {
  let service: NhlapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhlapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
