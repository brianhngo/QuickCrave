import { Component } from '@angular/core';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    RestaurantCardComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {}
