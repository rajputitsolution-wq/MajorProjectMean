import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Course {
  _id?: string;
  name: string;
  fees: string;
  duration: string;
  description: string;
  category: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:5000/api';
  private courseUpdatedSubject = new Subject<void>();
  courseUpdated$ = this.courseUpdatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders | undefined {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
  }

  private get requestOptions() {
    const headers = this.getAuthHeaders();
    return headers ? { withCredentials: true, headers } : { withCredentials: true };
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  adminLogin(data: any): Observable<any> {
    return this.http.post(`${this.url}/auth/admin/login`, data, this.requestOptions);
  }

  studentRegister(data: any): Observable<any> {
    return this.http.post(`${this.url}/auth/student/register`, data, this.requestOptions);
  }

  studentLogin(data: any): Observable<any> {
    return this.http.post(`${this.url}/auth/student/login`, data, this.requestOptions);
  }

  getStudentProfile(): Observable<any> {
    return this.http.get(`${this.url}/auth/student/me`, this.requestOptions);
  }

  updateStudentProfile(data: any): Observable<any> {
    return this.http.put(`${this.url}/auth/student/update-profile`, data, this.requestOptions);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.url}/auth/student/change-password`, data, this.requestOptions);
  }

  logout(): Observable<any> {
    this.clearToken();
    return this.http.post(`${this.url}/auth/logout`, {}, this.requestOptions);
  }

  dashboard(): Observable<any> {
    return this.http.get(`${this.url}/auth/dashboard`, this.requestOptions);
  }

  saveStudent(data: any): Observable<any> {
    return this.http.post(`${this.url}/students/add-student`, data, this.requestOptions);
  }

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/students`, this.requestOptions);
  }

  private notifyCoursesUpdated() {
    this.courseUpdatedSubject.next();
  }

  saveCourse(data: Course): Observable<Course> {
    return this.http.post<Course>(`${this.url}/courses/add-courses`, data, this.requestOptions).pipe(
      tap(() => this.notifyCoursesUpdated())
    );
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.url}/courses`, this.requestOptions);
  }

  updateCourse(id: string, courseData: Course): Observable<Course> {
    return this.http.put<Course>(`${this.url}/courses/${id}`, courseData, this.requestOptions).pipe(
      tap(() => this.notifyCoursesUpdated())
    );
  }

  deleteCourse(id: string): Observable<{ msg: string; id: string }> {
    return this.http.delete<{ msg: string; id: string }>(`${this.url}/courses/${id}`, this.requestOptions).pipe(
      tap(() => this.notifyCoursesUpdated())
    );
  }

  getCoursesByCategory(category: string): Observable<Course[]> {
    const normalizedCategory = encodeURIComponent(category?.trim() || '');
    return this.http.get<Course[]>(`${this.url}/courses/category/${normalizedCategory}`, this.requestOptions);
  }

  saveCertificate(data: any): Observable<any> {
    return this.http.post(`${this.url}/certificates/add-certificate`, data, this.requestOptions);
  }

  saveEnquiry(data: any): Observable<any> {
    return this.http.post(`${this.url}/enquiry/add-enquiry`, data, this.requestOptions);
  }
   getEnquiry(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.url}/enquiry`, this.requestOptions);
  }
  getCertificates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/certificates`, this.requestOptions);
  }
 getCertificateByNo(certNo: string): Observable<any> {
      const encoded = encodeURIComponent(certNo);
    return this.http.get<Course[]>(`${this.url}/certificates/${encoded}`, this.requestOptions);
  }
  saveNotice(data: any): Observable<any> {
    return this.http.post(`${this.url}/notices/add-notice`, data, this.requestOptions);
  }

  getNotices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/notices`, this.requestOptions);
  }
}
