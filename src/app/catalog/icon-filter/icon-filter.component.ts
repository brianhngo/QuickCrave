import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-filter.component.html',
  styleUrl: './icon-filter.component.css',
})
export class IconFilterComponent {
  categories: any[] = [
    { name: 'Boba', imageUrl: '../../assets/MenuImages/boba.png' },
    { name: 'Breakfast', imageUrl: '../../assets/MenuImages/breakfast.png' },
    { name: 'Chicken', imageUrl: '../../assets/MenuImages/chicken.png' },
    { name: 'Breakfast', imageUrl: '../../assets/MenuImages/breakfast.png' },
    { name: 'Chinese', imageUrl: '../../assets/MenuImages/chinesefood.png' },
    { name: 'Coffee', imageUrl: '../../assets/MenuImages/coffee.png' },
    { name: 'Dessert', imageUrl: '../../assets/MenuImages/dessert.png' },
    { name: 'Donuts', imageUrl: '../../assets/MenuImages/donuts.png' },
    { name: 'FastFood', imageUrl: '../../assets/MenuImages/fastfood.png' },
    { name: 'Fish', imageUrl: '../../assets/MenuImages/fish.png' },
    { name: 'Hamburger', imageUrl: '../../assets/MenuImages/hamburger.png' },
    { name: 'Italian', imageUrl: '../../assets/MenuImages/italian.png' },
    { name: 'Mexican', imageUrl: '../../assets/MenuImages/mexicanfood.png' },
    { name: 'Noodles', imageUrl: '../../assets/MenuImages/noodles.png' },
    { name: 'Pizza', imageUrl: '../../assets/MenuImages/pizza.png' },
    { name: 'Salad', imageUrl: '../../assets/MenuImages/salad.png' },
    { name: 'Sandwich', imageUrl: '../../assets/MenuImages/sandwich.png' },
    { name: 'Shrimp', imageUrl: '../../assets/MenuImages/shrimp.png' },
    { name: 'Smoothie', imageUrl: '../../assets/MenuImages/smoothie.png' },
    { name: 'Sushi', imageUrl: '../../assets/MenuImages/sushi.png' },
    { name: 'Tacos', imageUrl: '../../assets/MenuImages/tacos.png' },
    { name: 'Tacos', imageUrl: '../../assets/MenuImages/tacos.png' },
    { name: 'Tacos', imageUrl: '../../assets/MenuImages/tacos.png' },
    { name: 'Tacos', imageUrl: '../../assets/MenuImages/tacos.png' },
    { name: 'Tacos', imageUrl: '../../assets/MenuImages/tacos.png' },
  ];

  currentIndex: number = 0;
  pageSize: number = 10; // Number of categories per page
  currentPage: number = 0; // Current page index

  selectCategory(index: number): void {
    this.currentIndex = index;
  }

  prevCategory(): void {
    if (this.currentPage === 0) {
      this.currentPage = Math.ceil(this.categories.length / this.pageSize) - 1;
    } else {
      this.currentPage--;
    }
  }

  nextCategory(): void {
    const totalPages = Math.ceil(this.categories.length / this.pageSize);
    if (this.currentPage === totalPages - 1) {
      this.currentPage = 0;
    } else {
      this.currentPage++;
    }
  }

  get displayedCategories(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.categories.slice(startIndex, endIndex);
  }
}
