import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOnComponent } from './log-on.component';

describe('LogOnComponent', () => {
  let component: LogOnComponent;
  let fixture: ComponentFixture<LogOnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogOnComponent]
    });
    fixture = TestBed.createComponent(LogOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
