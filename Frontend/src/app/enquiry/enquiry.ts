import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Navbar } from "../navbar/navbar";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './enquiry.html',
  styleUrl: './enquiry.css'
})
export class Enquiry implements OnInit {

  enquiry = {
    name: '',
    email: '',
    phone: '',
    coursename: '',
    message: ''
  };

  enquiries: any[] = [];
  saved = false;
  messagew = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loadEnquiry();
  }

  loadEnquiry() {
    this.auth.getEnquiry().subscribe({
      next: (res: any) => {
        this.enquiries = Array.isArray(res) ? res : [];
      },
      error: (err) => {
        console.error(err);
        this.enquiries = [];
      }
    });
  }

  saveEnquiry() {
    if (
      !this.enquiry.name ||
      !this.enquiry.email ||
      !this.enquiry.phone ||
      !this.enquiry.coursename ||
      !this.enquiry.message
    ) {
      alert('Please fill all fields');
      return;
    }

    this.auth.saveEnquiry(this.enquiry).subscribe({
      next: (res: any) => {
        // Format the WhatsApp message with line breaks for readability
        this.messagew = `*New Enquiry:*\nName: ${this.enquiry.name}\nCourse: ${this.enquiry.coursename}\nMessage: ${this.enquiry.message}\n\nPlease get me more information on this course.`;
        
        // Generate the URL (using just the country code +91 without the + sign)
        const whatsappUrl = `https://api.whatsapp.com/send?phone=919552158758&text=${encodeURIComponent(this.messagew)}`;
        
        // Open WhatsApp automatically in a new tab
        window.open(whatsappUrl, '_blank');

        alert('Enquiry Submitted Successfully');

        this.saved = true;
        this.enquiries.unshift(res);

        // Reset the form
        this.enquiry = {
          name: '',
          email: '',
          phone: '',
          coursename: '',
          message: ''
        };
      },
      error: (err) => {
        console.error(err);
        alert('Unable to save enquiry');
      }
    });
  }

}