import { Component } from '@angular/core';
import { RestaurantHeaderComponent } from './restaurant-header/restaurant-header.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { RestaurantFaqComponent } from './restaurant-faq/restaurant-faq.component';
import { RestaurantReviewsComponent } from './restaurant-reviews/restaurant-reviews.component';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    RestaurantHeaderComponent,
    RestaurantMenuComponent,
    RestaurantFaqComponent,
    RestaurantReviewsComponent,
  ],
  providers: [ModalService],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent {}
