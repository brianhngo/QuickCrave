import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBanner4Component } from './hero-banner4.component';

describe('HeroBanner4Component', () => {
  let component: HeroBanner4Component;
  let fixture: ComponentFixture<HeroBanner4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBanner4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroBanner4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
