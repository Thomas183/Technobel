import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchematicComponent } from './edit-schematic.component';

describe('EditSchematicComponent', () => {
  let component: EditSchematicComponent;
  let fixture: ComponentFixture<EditSchematicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSchematicComponent]
    });
    fixture = TestBed.createComponent(EditSchematicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
