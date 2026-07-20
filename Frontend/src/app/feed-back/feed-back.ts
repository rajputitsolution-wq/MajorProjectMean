import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-feed-back',
  imports: [ CommonModule ],
  templateUrl: './feed-back.html',
  styleUrl: './feed-back.css',
})
export class FeedBack {
  students = [
    {
      name: 'Rahul Sharma',
      feedback: 'This course helped me build confidence in coding.',
      image: 'assets/students/rahul.jpg'
    },
    {
      name: 'Priya Mehta',
      feedback: 'The teachers explained concepts very clearly.',
      image: 'assets/students/priya.jpg'
    },
    {
      name: 'Amit Verma',
      feedback: 'I loved the practical projects we worked on.',
      image: 'assets/students/amit.jpg'
    },
    {
      name: 'Sneha Patil',
      feedback: 'Great experience, I learned a lot!',
      image: 'assets/students/sneha.jpg'
    }
  ];
}
