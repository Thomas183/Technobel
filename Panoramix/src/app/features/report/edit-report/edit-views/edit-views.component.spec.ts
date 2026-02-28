import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViewsComponent } from './edit-views.component';

describe('EditViewsComponent', () => {
  let component: EditViewsComponent;
  let fixture: ComponentFixture<EditViewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditViewsComponent]
    });
    fixture = TestBed.createComponent(EditViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
