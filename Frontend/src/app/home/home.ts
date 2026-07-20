import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from '../footer/footer';
import { Banner } from '../banner/banner';
import { Carousel } from '../carousel/carousel';
import { Gallery } from '../gallery/gallery';
import { FeedBack } from "../feed-back/feed-back";

@Component({
  selector: 'app-home',
  imports: [Navbar, Banner, Carousel, Gallery, Footer, FeedBack],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
