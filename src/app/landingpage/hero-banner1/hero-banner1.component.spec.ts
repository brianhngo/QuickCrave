import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBanner1Component } from './hero-banner1.component';

describe('HeroBanner1Component', () => {
  let component: HeroBanner1Component;
  let fixture: ComponentFixture<HeroBanner1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBanner1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroBanner1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
