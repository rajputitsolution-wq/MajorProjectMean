import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
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

    this.auth.adminLogin(this.form.value).subscribe({
      next: (res: any) => {
        if (res?.token) {
          this.auth.setToken(res.token);
        }
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.msg || 'Login failed';
      }
    });
  }
}
