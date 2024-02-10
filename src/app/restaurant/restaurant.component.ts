import { Component } from '@angular/core';
import { RestaurantHeaderComponent } from './restaurant-header/restaurant-header.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [RestaurantHeaderComponent, RestaurantMenuComponent],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent {}
