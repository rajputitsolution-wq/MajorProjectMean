import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { AuthService } from '../services/auth';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Sidebar],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css',
})
export class Certificates implements OnInit {
  certNo='';
  studentName = '';
  courseName = '';
  issuedDate = '';
  status = 'Issued';
  certificates: any[] = [];
  saved = false;

  constructor(private auth: AuthService, private sidebar: SidebarService) {}

  ngOnInit() {
    this.loadCertificates();
  }

  toggleSidebar() {
    this.sidebar.toggle();
  }

  loadCertificates() {
    this.auth.getCertificates().subscribe({
      next: (res: any) => {
        this.certificates = Array.isArray(res) ? res : [];
      },
      error: (err: any) => {
        console.error('Failed to load certificates', err);
        this.certificates = [];
      }
    });
  }

  saveCertificate() {
    if (!this.certNo.trim() || !this.studentName.trim() || !this.courseName.trim()) {
      alert('Certificate number, student name, and course name are required.');
      return;
    }

    const certificate = {
      certNo: this.certNo.trim(),
      studentName: this.studentName.trim(),
      courseName: this.courseName.trim(),
      issuedDate: this.issuedDate || new Date().toISOString(),
      status: this.status,
    };

    this.auth.saveCertificate(certificate).subscribe({
      next: (res: any) => {
        this.saved = true;
        this.certificates.unshift(res);
        this.certNo = '';
        this.studentName = '';
        this.courseName = '';
        this.issuedDate = '';
        this.status = 'Issued';
      },
      error: (err: any) => {
        console.error('Certificate save failed', err);
        alert(err.error?.msg || 'Unable to save certificate.');
      }
    });
  }
}

