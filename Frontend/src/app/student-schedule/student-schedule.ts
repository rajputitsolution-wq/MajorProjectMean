import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { StudentSidebar } from '../student-sidebar/student-sidebar';

@Component({
  selector: 'app-student-schedule',
  standalone: true,
  imports: [CommonModule, RouterModule, StudentSidebar],
  templateUrl: './student-schedule.html',
  styleUrls: ['../student-layout.css', './student-schedule.css']
})
export class StudentSchedule implements OnInit {
  schedule: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getStudentProfile().subscribe({
      next: (res) => {
        this.schedule = res?.schedule || [];
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.msg || 'Unable to load schedule.';
        this.loading = false;
      }
    });
  }
}
