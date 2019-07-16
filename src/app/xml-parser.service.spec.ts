import { TestBed } from '@angular/core/testing';

import { XmlParserService } from './xml-parser.service';

describe('XmlParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XmlParserService = TestBed.get(XmlParserService);
    expect(service).toBeTruthy();
  });
});
