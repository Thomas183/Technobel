import { TestBed } from '@angular/core/testing';

import { DisplayViewService } from './displayView.service';

describe('EditReportService', () => {
  let service: DisplayViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
