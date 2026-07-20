import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { StudentSidebar } from '../student-sidebar/student-sidebar';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, StudentSidebar],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css', '../student-layout.css']
})
export class StudentDashboard implements OnInit {
  student: any = null;
  loading = true;
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStudent();
  }

  loadStudent() {
    this.loading = true;
    this.auth.getStudentProfile().subscribe({
      next: (res) => {
        this.student = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.msg || 'Unable to load student dashboard.';
        this.loading = false;
        this.router.navigate(['/student-login']);
      }
    });
  }
}
