import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  images = [
    {
      title: 'Nature',
      Image : 'n1.jpg'
    },
    {
      title: 'Mountain',
      Image : 'n2.jpg'
    },
    {
      title: 'Beach',
      Image : 'n3.jpg'
    },
    {
      title: 'Forest',
      Image : 'n4.jpg'
    },
    {
      title: 'City',
      Image : 'n5.jpg'
    },
    {
      title: 'Flowers',
      Image : 'n6.jpg'
    }
  ];
}
