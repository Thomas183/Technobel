import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayViewsComponent } from './display-views.component';

describe('DisplayViewsComponent', () => {
  let component: DisplayViewsComponent;
  let fixture: ComponentFixture<DisplayViewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayViewsComponent]
    });
    fixture = TestBed.createComponent(DisplayViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
