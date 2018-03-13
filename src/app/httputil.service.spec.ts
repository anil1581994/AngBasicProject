import { TestBed, inject } from '@angular/core/testing';

import { HttputilService } from './httputil.service';

describe('HttputilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttputilService]
    });
  });

  it('should be created', inject([HttputilService], (service: HttputilService) => {
    expect(service).toBeTruthy();
  }));
});
