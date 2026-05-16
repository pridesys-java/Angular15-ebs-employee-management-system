import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee.component.html'
})
export class EmployeeListComponent {

    employees: any[] = [];
    departments: any[] = [];
    positions: any[] = [];

    selected: any = {};
    showModal = false;

    constructor(
        private auth: AuthService
    ) { }




    // ================= LOGOUT =================
    logout(): void {
        this.auth.logout();
    }

    
}
