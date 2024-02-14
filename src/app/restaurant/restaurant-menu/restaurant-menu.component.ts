import { Component } from '@angular/core';
import { ItemCardComponent } from '../item-card/item-card.component';

@Component({
  selector: 'app-restaurant-menu',
  standalone: true,
  imports: [ItemCardComponent],
  templateUrl: './restaurant-menu.component.html',
  styleUrl: './restaurant-menu.component.css',
})
export class RestaurantMenuComponent {}
