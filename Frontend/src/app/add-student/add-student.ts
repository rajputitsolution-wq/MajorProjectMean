import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { AuthService } from '../services/auth';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Sidebar],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css',
})
export class AddStudent implements OnInit {
  name = '';
  email = '';
  phone = '';
  course = '';
  students: any[] = [];
  saved = false;

  constructor(private auth: AuthService, private sidebar: SidebarService) {}

  ngOnInit() {
    this.loadStudents();
  }

  toggleSidebar() {
    this.sidebar.toggle();
  }

  loadStudents() {
    this.auth.getStudents().subscribe({
      next: (res: any) => {
        this.students = Array.isArray(res) ? res : [];
      },
      error: (err: any) => {
        console.error('Failed to load students', err);
        this.students = [];
      }
    });
  }

  saveStudent() {
    if (!this.name.trim() || !this.email.trim()) {
      alert('Name and email are required.');
      return;
    }

    const student = {
      name: this.name.trim(),
      email: this.email.trim(),
      phone: this.phone.trim(),
      course: this.course.trim(),
    };

    this.auth.saveStudent(student).subscribe({
      next: (res: any) => {
        this.saved = true;
        this.students.unshift(res);
        this.name = '';
        this.email = '';
        this.phone = '';
        this.course = '';
      },
      error: (err: any) => {
        console.error('Student save failed', err);
        alert(err.error?.msg || 'Unable to save student.');
      }
    });
  }
}

