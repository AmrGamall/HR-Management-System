import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { minPeriodValidator } from 'src/app/MinimumPeriodClocked';
import { calculateAge } from 'src/app/calculateAge';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { DeptServicesService } from 'src/app/services/dept-services.service';
import { EmpServicesService } from 'src/app/services/emp-services.service';
import { TimeUtility } from 'src/environments/TimeUtility';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {

  validDepartment: FormGroup;
  modalRef?: BsModalRef; // this is a reference to bootstrap modal
  isSubmitted: boolean = false;
  departmentDTO: any = {};

  departments: IDepartment[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private departmentServices: DeptServicesService,
    private toastr: ToastrService,

    private modalService: BsModalService,
    private router: Router
  ) {
    this.validDepartment = formBuilder.group({
      name: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    }, {
      validator: minPeriodValidator(),
    })
  }







  get name() {
    return this.validDepartment.get("name")
  }
 

  ngOnInit(): void {
    // this.departmentServices.getDepartments().subscribe((data) => {
    //   this.departments = data as IDepartment[];
    // });


    this.departmentServices.getDepartments().subscribe((data) => {
      this.departments = data
      console.log(this.departments)
    });



  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.validDepartment.valid) {
      return;
    }


    this.departmentServices.addDepartment(this.departmentDTO).subscribe((data) => {

      this.toastr.success('A Department has been added');
      this.router.navigate(['/department/display']);
      this.reset();
    });
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }
  reset() {

    this.departmentDTO = {}

    this.validDepartment.reset();
  }
}
