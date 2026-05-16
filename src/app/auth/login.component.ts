import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  onLogin(f: any): void {

    const email = f.value.email;
    const password = f.value.password;

    this.auth.login(email, password).subscribe({
      next: (res) => {
        console.log('LOGIN RESPONSE:', res);
        if (res) {
          localStorage.setItem('user', email);
          this.router.navigate(['/employees']);
        } else {
          this.error = 'Invalid Email or Password';
        }

      },
      error: () => {
        this.error = 'Invalid Email or Password';
      }

    });
  }
}