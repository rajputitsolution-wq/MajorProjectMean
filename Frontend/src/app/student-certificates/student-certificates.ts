import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { StudentSidebar } from '../student-sidebar/student-sidebar';

@Component({
  selector: 'app-student-certificates',
  standalone: true,
  imports: [CommonModule, RouterModule, StudentSidebar],
  templateUrl: './student-certificates.html',
  styleUrls: ['../student-layout.css', './student-certificates.css']
})
export class StudentCertificates implements OnInit {
  certificates: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getStudentProfile().subscribe({
      next: (res) => {
        this.certificates = res?.certificates || [];
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.msg || 'Unable to load certificates.';
        this.loading = false;
      }
    });
  }
}
