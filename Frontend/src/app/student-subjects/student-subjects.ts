import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { StudentSidebar } from '../student-sidebar/student-sidebar';

@Component({
  selector: 'app-student-subjects',
  standalone: true,
  imports: [CommonModule, RouterModule, StudentSidebar],
  templateUrl: './student-subjects.html',
  styleUrls: ['../student-layout.css', './student-subjects.css']
})
export class StudentSubjects implements OnInit {
  student: any = null;
  loading = true;
  errorMessage = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getStudentProfile().subscribe({
      next: (res) => {
        this.student = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.msg || 'Unable to load subjects.';
        this.loading = false;
      }
    });
  }
}
