import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFaqComponent } from './restaurant-faq.component';

describe('RestaurantFaqComponent', () => {
  let component: RestaurantFaqComponent;
  let fixture: ComponentFixture<RestaurantFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantFaqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
