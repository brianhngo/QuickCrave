// landingpage.component.ts
import { Component } from '@angular/core';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HeroBanner1Component } from './hero-banner1/hero-banner1.component';
import { HeroBanner2Component } from './hero-banner2/hero-banner2.component';
import { HeroBanner3Component } from './hero-banner3/hero-banner3.component';
import { HeroBanner4Component } from './hero-banner4/hero-banner4.component';
import { HeroBanner5Component } from './hero-banner5/hero-banner5.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroBanner1Component,
    HeroBanner2Component,
    HeroBanner3Component,
    HeroBanner4Component,
    HeroBanner5Component,
    AboutUsComponent,
    FooterComponent,
    ModalComponent,
    CommonModule,
  ],
  providers: [AuthService],
})
export class LandingpageComponent {
  constructor(public AuthService: AuthService) {}
}
