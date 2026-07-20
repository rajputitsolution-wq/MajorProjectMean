import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [Navbar],
  templateUrl: './basic.html',
  styleUrls: ['./basic.css']
})
export class Basic implements OnInit, OnDestroy {

  courses: any[] = [];
  filteredCourses: any[] = [];
  selectedCategory = 'All';

  private destroy$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // 1. Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // ✅ ALWAYS reload when route is visited
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.loadCourses();
        }
      });

    // initial load
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCourses(): void {
    this.auth.getCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.courses = data || [];
          this.applyFilter(); 
        },
        error: (err) => {
          console.error(err);
          this.courses = [];
          this.filteredCourses = [];
          this.cdr.detectChanges(); // Update UI immediately on error
        }
      });
  }

  filterCourses(category: string): void {
    this.selectedCategory = category;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedCategory === 'All') {
      this.filteredCourses = [...this.courses];
    } else {
      this.filteredCourses = this.courses.filter(c =>
        c.category?.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
    
    // 2. Force the UI to update as soon as the filter finishes
    this.cdr.detectChanges(); 
  }

  enquiry(course: any): void {
    this.router.navigate(['/enquiry'], { state: { course } });
  }
}