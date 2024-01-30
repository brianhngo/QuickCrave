import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBanner3Component } from './hero-banner3.component';

describe('HeroBanner3Component', () => {
  let component: HeroBanner3Component;
  let fixture: ComponentFixture<HeroBanner3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBanner3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroBanner3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
