import { Component } from '@angular/core';
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
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  constructor(private router: Router) {}

  currentPage: string = 'personal';

  changePage(page: string): void {
    this.currentPage = page;
  }
}
