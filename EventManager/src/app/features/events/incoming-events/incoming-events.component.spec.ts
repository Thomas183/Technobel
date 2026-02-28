import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingEventsComponent } from './incoming-events.component';

describe('IncomingEventsComponent', () => {
  let component: IncomingEventsComponent;
  let fixture: ComponentFixture<IncomingEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomingEventsComponent]
    });
    fixture = TestBed.createComponent(IncomingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
