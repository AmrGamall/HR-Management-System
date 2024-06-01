import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDepartmentComponent } from './display-department.component';

describe('DisplayDepartmentComponent', () => {
  let component: DisplayDepartmentComponent;
  let fixture: ComponentFixture<DisplayDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayDepartmentComponent]
    });
    fixture = TestBed.createComponent(DisplayDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
