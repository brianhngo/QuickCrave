import { Component, OnInit } from '@angular/core';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ReviewHistoryComponent } from './review-history/review-history.component';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { auth } from '../firebase.config';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    PersonalInfoComponent,
    PaymentInfoComponent,
    ChangePasswordComponent,
    DriverProfileComponent,
    OrderHistoryComponent,
    ReviewHistoryComponent,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    CommonModule,
  ],
  providers: [AuthService],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  // Current Page on profile
  currentPage: string = 'personal';

  // Checking user authentication. If no token, send back to homepage
  isLoggedIn: boolean = false;
  currentRoute: string = this.router.url;

  changePage(page: string): void {
    this.currentPage = page;
  }

  ngOnInit(): void {
    this.authService.authenticateUser();

    auth.onAuthStateChanged((user) => {
      if (user) {
        // Authentication successful
        this.authService.userAuthentication = user;
        this.isLoggedIn = true; // Set isLoggedIn to true
      } else {
        // Authentication failed
        this.authService.userAuthentication = null;
        this.isLoggedIn = false; // Set isLoggedIn to false
        // Redirect to homepage
        this.router.navigateByUrl('/');
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
}
