import { Component } from '@angular/core';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconFilterComponent } from './icon-filter/icon-filter.component';
import { ButtonFilterComponent } from './button-filter/button-filter.component';
import { SortComponentComponent } from './sort-component/sort-component.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    RestaurantCardComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    IconFilterComponent,
    ButtonFilterComponent,
    SortComponentComponent,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {}
