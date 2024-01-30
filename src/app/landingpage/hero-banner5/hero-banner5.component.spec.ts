import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBanner5Component } from './hero-banner5.component';

describe('HeroBanner5Component', () => {
  let component: HeroBanner5Component;
  let fixture: ComponentFixture<HeroBanner5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBanner5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroBanner5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
