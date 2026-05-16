import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

    baseUrl = 'http://localhost:8090/api';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${this.baseUrl}/employee/get-all`);
    }

    save(emp: any) {
        return this.http.post(`${this.baseUrl}/employee/save`, emp);
    }

    delete(id: number) {
        return this.http.delete(`${this.baseUrl}/employee/remove-by-id/${id}`);
    }

    getDepartments() {
        return this.http.get<any[]>(`${this.baseUrl}/department/get-all`);
    }

    getPositions() {
        return this.http.get<any[]>(`${this.baseUrl}/position/get-all`);
    }

    getStats() {
        return this.http.get<any>(`${this.baseUrl}/employee/stats`);
    }
}

