import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { EmployeeService } from './employee.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee.component.html',
    standalone: true, 
    imports: [CommonModule],
})
export class EmployeeListComponent implements OnInit {

    employees: any[] = [];
    departments: any[] = [];
    positions: any[] = [];

    selected: any = {};
    showModal = false;

    constructor(
        private service: EmployeeService,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        this.loadAll();
    }

    // ================= LOAD =================
    loadAll(): void {
        this.service.getAll().subscribe(res => {
            this.employees = res || [];
        });

        this.service.getDepartments().subscribe(res => this.departments = res || []);
        this.service.getPositions().subscribe(res => this.positions = res || []);
    }

    // ================= ADD =================
    add(): void {
        this.selected = {
            empName: '',
            email: '',
            dob: '',
            joiningDate: '',
            departmentId: null,
            positionId: null
        };
        this.showModal = true;
    }

    // ================= EDIT (FIXED) =================
    edit(emp: any): void {
        this.selected = {
            id: emp.id,
            empName: emp.empName,
            email: emp.email,
            dob: emp.dob?.substring(0, 10),
            joiningDate: emp.joiningDate?.substring(0, 10),
            departmentId: emp.department?.id,
            positionId: emp.position?.id
        };
        this.showModal = true;
    }

    // ================= SAVE (FIXED PAYLOAD) =================
    save(emp: any): void {

        const payload = {
            id: emp.id,
            empName: emp.empName,
            email: emp.email,
            dob: emp.dob,
            joiningDate: emp.joiningDate,

            department: {
                id: emp.departmentId
            },

            position: {
                id: emp.positionId
            }
        };

        this.service.save(payload).subscribe(() => {
            this.showModal = false;
            this.loadAll();
        });
    }

    onSaved(): void {
        this.showModal = false;
        this.loadAll();
    }

    // ================= DELETE (FIXED) =================
    delete(id: number): void {
        if (!confirm('Delete employee?')) return;

        this.service.delete(id).subscribe({
            next: () => {
                console.log('Deleted:', id);
                this.loadAll();
            },
            error: err => console.error(err)
        });
    }

 

    // ================= LOGOUT =================
    logout(): void {
        this.auth.logout();
    }

    close(): void {
        this.showModal = false;
    }
}
