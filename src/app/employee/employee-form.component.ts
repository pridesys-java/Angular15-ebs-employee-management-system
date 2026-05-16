import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {

  @Input() employee: any = {};
  @Output() saved = new EventEmitter();

  departments: any[] = [];
  positions: any[] = [];

  constructor(private service: EmployeeService) { }

  ngOnInit() {
    this.loadDropdowns();
  }

  loadDropdowns() {
    this.service.getDepartments().subscribe(res => this.departments = res);
    this.service.getPositions().subscribe(res => this.positions = res);
  }

 save() {

  if (!this.employee.departmentId || !this.employee.positionId) {
    alert('Department & Position required');
    return;
  }

  const payload = {
    id: this.employee.id,
    empName: this.employee.empName,
    email: this.employee.email,
    dob: this.employee.dob,
    joiningDate: this.employee.joiningDate,
    department: { id: this.employee.departmentId },
    position: { id: this.employee.positionId }
  };

  console.log('SAVE PAYLOAD = ', payload);

  this.service.save(payload).subscribe({
    next: () => this.saved.emit(),
    error: err => console.error(err)
  });
}
}