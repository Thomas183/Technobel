import { TestBed } from '@angular/core/testing';

import { DisplaySchematicService } from './display-schematic.service';

describe('DisplaySchematicService', () => {
  let service: DisplaySchematicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplaySchematicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
