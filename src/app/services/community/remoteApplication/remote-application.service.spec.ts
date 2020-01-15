import { TestBed } from '@angular/core/testing';

import { RemoteApplicationService } from './remote-application.service';

describe('RemoteApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoteApplicationService = TestBed.get(RemoteApplicationService);
    expect(service).toBeTruthy();
  });
});
