import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './student-login.html',
  styleUrls: ['./student-login.css']
})
export class StudentLogin {
  form: FormGroup;
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.form.invalid) {
      this.errorMessage = 'Please enter valid credentials.';
      return;
    }

    this.auth.studentLogin(this.form.value).subscribe({
      next: (res: any) => {
        if (res?.token) {
          this.auth.setToken(res.token);
        }
        this.router.navigate(['/student-dashboard']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.msg || 'Login failed';
      }
    });
  }
}
