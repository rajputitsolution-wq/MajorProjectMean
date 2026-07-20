import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  email: string = '';  
  status: boolean = false; 
  constructor(private router: Router) {} 
  toggle() {
    if (this.email) {
      this.status = true;
      this.email = '';      
      this.router.navigate(['/']); 
    }
    else {
      this.status = false;
    }
  }
}
