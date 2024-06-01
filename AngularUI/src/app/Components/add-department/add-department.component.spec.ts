import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentComponent } from './add-department.component';

describe('AddDepartmentComponent', () => {
  let component: AddDepartmentComponent;
  let fixture: ComponentFixture<AddDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDepartmentComponent]
    });
    fixture = TestBed.createComponent(AddDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
