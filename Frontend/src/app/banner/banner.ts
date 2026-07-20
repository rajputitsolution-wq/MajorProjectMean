import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {}
