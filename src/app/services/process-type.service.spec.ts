import { TestBed } from '@angular/core/testing';

import { ProcessTypeService } from './process-type.service';

describe('ProcessTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessTypeService = TestBed.get(ProcessTypeService);
    expect(service).toBeTruthy();
  });
});
