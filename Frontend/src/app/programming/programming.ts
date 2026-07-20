import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-programming',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programming.html',
  styleUrl: './programming.css',
})
export class Programming implements OnInit, OnDestroy {
  courses: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.loadCourses(params['category']);
      console.log('Category from route:', params['category']);
    });

    this.auth.courseUpdated$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadCourses(this.route.snapshot.params['category']);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCourses(category: string) {
    this.auth.getCoursesByCategory(category || 'Programming').subscribe({
      next: (data) => {
        this.courses = Array.isArray(data) ? data : [];
        console.log('Courses loaded for category', category, ':', this.courses);
      },
      error: (err) => {
        console.error('Programming courses load error', err);
        this.courses = [];
      }
    });
  }
}
