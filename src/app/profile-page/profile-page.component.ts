import { Component } from '@angular/core';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ReviewHistoryComponent } from './review-history/review-history.component';

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
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {}
