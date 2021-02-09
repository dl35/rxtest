import { TestBed } from '@angular/core/testing';

import { TestrestService } from './testrest.service';

describe('TestrestService', () => {
  let service: TestrestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestrestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
