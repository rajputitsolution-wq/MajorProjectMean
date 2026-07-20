import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from "../sidebar/sidebar";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from '../services/auth';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  coursesCount = 0;
  studentsCount = 0;
  certificatesCount = 0;
  latestNotice = 'Loading notices...';
  noticeTitle = 'Latest Notice';

  constructor(
    private auth: AuthService,
    private sidebar: SidebarService,
    private router: Router,
    private cdr: ChangeDetectorRef // 1. Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDashboardStats();
  }

  toggleSidebar() {
    this.sidebar.toggle();
  }

  logout() {
    this.auth.clearToken();
    this.router.navigate(['/home']);
  }

  loadDashboardStats() {
    this.auth.dashboard().subscribe({
      next: (res: any) => {
        this.coursesCount = typeof res.coursesCount === 'number' ? res.coursesCount : 0;
        this.studentsCount = typeof res.studentsCount === 'number' ? res.studentsCount : 0;
        this.certificatesCount = typeof res.certificatesCount === 'number' ? res.certificatesCount : 0;
        this.latestNotice = res.latestNotice || 'No notices yet.';
        this.noticeTitle = res.noticeTitle || 'Latest Notice';
        
        this.cdr.detectChanges(); // 2. Force the UI to update immediately
      },
      error: (err: any) => {
        console.error('Failed to load dashboard stats', err);
        this.coursesCount = 0;
        this.studentsCount = 0;
        this.certificatesCount = 0;
        this.latestNotice = 'Unable to load notice from MongoDB.';
        
        this.cdr.detectChanges(); // Update the UI immediately on error too
      }
    });
  }
}