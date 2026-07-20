import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      course: ['']
    });
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.studentRegister(this.form.value).subscribe({
      next: () => {
        alert('Registration Successful');
        this.router.navigate(['/student-login']);
      },
      error: (err) => {
        const message = err?.error?.msg || err?.error || 'Registration failed. Please try again.';
        alert(message);
      }
    });
  }
}
