import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-certificate',
  imports: [FormsModule, CommonModule, Navbar],
  templateUrl: './verifycertificate.html',
})
export class CertificateComponent {

  certificateNo: string = '';
  certificateData: any;
  message: string = '';

  constructor(
    private certService: AuthService,
    private cdr: ChangeDetectorRef // 1. Inject ChangeDetectorRef
  ) {}

  getCertificate() {
    console.log('Fetching certificate for no:', this.certificateNo);
    
    this.certService.getCertificateByNo(this.certificateNo)
      .subscribe({
        next: (res) => {
          this.certificateData = res;
          this.message = '';
          
          this.cdr.detectChanges(); // 2. Force UI update on success
        },
        error: (err) => {
          console.log('Not found', err);
          this.certificateData = null;
          this.message = 'Certificate not found.';
          
          this.cdr.detectChanges(); // 3. Force UI update on error
        }
      });
  }
}