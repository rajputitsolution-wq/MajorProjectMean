import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { StudentSidebar } from '../student-sidebar/student-sidebar';

@Component({
  selector: 'app-student-notices',
  standalone: true,
  imports: [CommonModule, RouterModule, StudentSidebar],
  templateUrl: './student-notices.html',
  styleUrls: ['../student-layout.css', './student-notices.css']
})
export class StudentNotices implements OnInit {
  notices: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getStudentProfile().subscribe({
      next: (res) => {
        this.notices = res?.notices || [];
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.msg || 'Unable to load notices.';
        this.loading = false;
      }
    });
  }
}
