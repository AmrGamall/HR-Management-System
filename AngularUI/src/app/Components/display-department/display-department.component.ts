import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { DeptServicesService } from 'src/app/services/dept-services.service';
import { EmpServicesService } from 'src/app/services/emp-services.service';

@Component({
  selector: 'app-display-department',
  templateUrl: './display-department.component.html',
  styleUrls: ['./display-department.component.css']
})
export class DisplayDepartmentComponent {
  departments: IDepartment[] = [];
  modalRef?: BsModalRef; // this is a reference to bootstrap modal

  totalLength: any;
  page: number = 1;
  searchText: any;
  deleteDept: number = 1;

  constructor(
    private departmentService: DeptServicesService,
    private router: Router,
    private modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((data) => {
      this.departments = data as IDepartment[];
    });
  }
  addDepartment() {
    this.router.navigate(['/department/add']);
  }
  deleteDepartment(id: number): void {
    this.modalRef?.hide();

    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.departments = this.departments.filter((emp) => emp.id !== id);
    });
  }
  trackByFn(index: number, department: IDepartment) {
    return department.id;
  }

  decline(): void {
    this.modalRef?.hide();
  }
  openModal(template: TemplateRef<void>, id: number) {
    this.deleteDept = id;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
