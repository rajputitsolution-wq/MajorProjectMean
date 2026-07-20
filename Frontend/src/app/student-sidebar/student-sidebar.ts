import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SidebarService } from '../services/sidebar.service';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './student-sidebar.html',
  styleUrls: ['./student-sidebar.css']
})
export class StudentSidebar {
  constructor(
    public sidebar: SidebarService,
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.router.navigate(['/student-login'])
    });
  }
}
