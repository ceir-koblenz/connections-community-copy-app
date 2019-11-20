import { TestBed } from '@angular/core/testing';

import { CreateTemplateService } from './create-template.service';

describe('CreateTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateTemplateService = TestBed.get(CreateTemplateService);
    expect(service).toBeTruthy();
  });
});
