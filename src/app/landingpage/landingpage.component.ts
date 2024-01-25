// landingpage.component.ts
import { Component } from '@angular/core';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HeroBanner1Component } from './hero-banner1/hero-banner1.component';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  standalone: true,
  imports: [NavigationBarComponent, HeroBanner1Component],
})
export class LandingpageComponent {}
