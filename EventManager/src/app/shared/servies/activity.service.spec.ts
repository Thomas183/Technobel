import { TestBed } from '@angular/core/testing';

import { activityService } from './activity.service';

describe('ApiService', () => {
  let service: activityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(activityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
