import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8090/api';
  private doLoginUrl = 'http://localhost:8090/api/login/do-login';
  // private doLoginUrl = '${this.baseUrl}/api/login/do-login';
  private signUpUrl = 'http://localhost:8090/api/login/save';



  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {

    const body = new HttpParams()
      .set('EMAIL', email)
      .set('PASSWORD', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(this.doLoginUrl, body.toString(), { headers });
  }

  signup(emp: any) {
    return this.http.post(this.signUpUrl, emp);
  }


  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}