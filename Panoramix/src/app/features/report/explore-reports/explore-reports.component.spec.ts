import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreReportsComponent } from './explore-reports.component';

describe('ExploreReportsComponent', () => {
  let component: ExploreReportsComponent;
  let fixture: ComponentFixture<ExploreReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreReportsComponent]
    });
    fixture = TestBed.createComponent(ExploreReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
