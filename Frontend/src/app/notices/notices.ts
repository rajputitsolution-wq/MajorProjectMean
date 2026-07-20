import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Sidebar],
  templateUrl: './notices.html',
  styleUrl: './notices.css',
})
export class Notices implements OnInit {
  title = '';
  message = '';
  notices: any[] = [];
  saved = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.loadNotices();
  }

  loadNotices() {
    this.auth.getNotices().subscribe({
      next: (res: any) => {
        this.notices = Array.isArray(res) ? res : [];
      },
      error: (err: any) => {
        console.error('Failed to load notices', err);
        this.notices = [];
      }
    });
  }

  saveNotice() {
    if (!this.message.trim()) {
      alert('Notice message is required.');
      return;
    }

    const notice = {
      title: this.title.trim() || 'Notice',
      message: this.message.trim(),
    };

    this.auth.saveNotice(notice).subscribe({
      next: (res: any) => {
        this.saved = true;
        this.notices.unshift(res);
        this.title = '';
        this.message = '';
      },
      error: (err: any) => {
        console.error('Notice save failed', err);
        alert(err.error?.msg || 'Unable to save notice.');
      }
    });
  }
}

