import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { AuthService } from '../services/auth';
import { Sidebar } from '../sidebar/sidebar';
import { SidebarService } from '../services/sidebar.service';

interface Course {
  _id?: string; 
  name: string;
  fees: string;
  duration: string;
  description: string;
  category: string;
  createdAt?: string;
}

@Component({
  selector: 'app-add-course',
  imports: [CommonModule, FormsModule, RouterLink, Sidebar],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css',
})
export class AddCourse {
  name = '';
  fees = '';
  duration = '';
  description = '';
  category = 'Basic';
  courses: Course[] = [];
  saved = false;
  loading = false;

  editingId: string | null = null;

  constructor(private auth: AuthService, private sidebar: SidebarService) {}

  ngOnInit() {
    this.loadCourses();
  }

  toggleSidebar() {
    this.sidebar.toggle();
  }

  loadCourses() {
    this.auth.getCourses().subscribe({
      next: (res: any) => {
        this.courses = Array.isArray(res) ? res : [];
      },
      error: (err: any) => {
        console.error('Failed to load courses from MongoDB', err);
        this.courses = [];
      }
    });
  }

  editCourse(course: Course) {
    this.name = course.name;
    this.fees = course.fees;
    this.duration = course.duration;
    this.description = course.description;
    this.category = course.category;

    this.editingId = course._id || null;
  }

  save() {
    if (!this.name.trim() || !this.fees.trim() || !this.duration.trim() || !this.description.trim()) {
      alert('Please complete all fields before saving.');
      return;
    }

    const courseData = {
      name: this.name.trim(),
      fees: this.fees.trim(),
      duration: this.duration.trim(),
      description: this.description.trim(),
      category: this.category,
    };

    if (this.editingId) {
      this.auth.updateCourse(this.editingId, courseData).subscribe({
        next: (res: Course) => {
          const index = this.courses.findIndex(c => c._id === this.editingId);
          if (index > -1) this.courses[index] = res;
          this.editingId = null;
          this.resetForm();
        },
        error: (err: any) => {
          console.error('Course update failed', err);
          alert(err.error?.msg || 'Unable to update course.');
        }
      });
    } else {
      this.auth.saveCourse(courseData).subscribe({
        next: (res: Course) => {
          this.courses.unshift(res);
          this.saved = true;
          this.resetForm();
        },
        error: (err: any) => {
          console.error('Course save failed', err);
          alert(err.error?.msg || 'Unable to save course.');
        }
      });
    }
  }

  deleteCourse(id: string, index: number) {
    if (!confirm('Are you sure you want to delete this course?')) return;

    this.auth.deleteCourse(id).subscribe({
      next: () => {
        this.courses.splice(index, 1);
      },
      error: (err: any) => {
        console.error('Course delete failed', err);
        alert(err.error?.msg || 'Unable to delete course.');
      }
    });
  }

  onImageSelected(files: FileList | null) {
    // Image attachments are no longer supported.
    return;
  }

  resetForm() {
    this.name = '';
    this.fees = '';
    this.duration = '';
    this.description = '';
    this.category = 'Basic';
    
  }
}
