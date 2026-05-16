import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signup',
  standalone: true, // ✅ using standalone
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  onSignup(emp: any): void {

    if (!emp.valid) {
      this.error = 'Please fill all required fields';
      return;
    }

    if (!emp.value.email) {
      alert("Email required!");
      return;
    }

    if (!emp.value.password) {
      alert("Password required!");
      return;
    }

    if (!emp.value.confirmPassword) {
      alert("Confirm Password required!");
      return;
    }

    if (emp.value.password !== emp.value.confirmPassword) {
      alert("Password not matched!");
      return;
    }

    const payload = {
      email: emp.value.email,
      password: emp.value.password
    };

    this.auth.signup(payload).subscribe({
      next: (res) => {
        console.log('SIGNUP RESPONSE:', res);

        if (res) {
          localStorage.setItem('user', payload.email);
          this.router.navigate(['/login']);
        } else {
          this.error = 'Signup failed';
        }
      },
      error: () => {
        this.error = 'Signup failed';
      }
    });
  }
}