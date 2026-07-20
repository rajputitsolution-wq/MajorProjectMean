import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { StudentSidebar } from '../student-sidebar/student-sidebar';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, StudentSidebar],
  templateUrl: './student-profile.html',
  styleUrls: ['./student-profile.css', '../student-layout.css']
})
export class StudentProfile implements OnInit {
  student: any = null;
  errorMessage = '';
  successMessage = '';
  isLoading = true;
  passwordForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.auth.getStudentProfile().subscribe({
      next: (res) => {
        this.student = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.msg || 'Unable to load student profile.';
        this.isLoading = false;
        this.router.navigate(['/student-login']);
      }
    });
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/student-login']);
      },
      error: () => {
        this.router.navigate(['/student-login']);
      }
    });
  }

  changePassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.passwordForm.invalid) {
      this.errorMessage = 'Please complete the password fields.';
      return;
    }

    const { oldPassword, newPassword, confirmPassword } = this.passwordForm.value;
    if (newPassword !== confirmPassword) {
      this.errorMessage = 'The new password and confirmation do not match.';
      return;
    }

    this.auth.changePassword({ oldPassword, newPassword }).subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully.';
        this.passwordForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error?.msg || 'Unable to change password.';
      }
    });
  }
}
