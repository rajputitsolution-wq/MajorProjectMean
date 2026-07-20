import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-about',
  imports: [Navbar, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
