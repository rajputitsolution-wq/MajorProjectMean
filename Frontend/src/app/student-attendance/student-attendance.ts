import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { StudentSidebar } from '../student-sidebar/student-sidebar';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [CommonModule, RouterModule, StudentSidebar],
  templateUrl: './student-attendance.html',
  styleUrls: ['../student-layout.css', './student-attendance.css']
})
export class StudentAttendance implements OnInit {
  attendance: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getStudentProfile().subscribe({
      next: (res) => {
        this.attendance = res?.attendance || [];
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.msg || 'Unable to load attendance.';
        this.loading = false;
      }
    });
  }
}
