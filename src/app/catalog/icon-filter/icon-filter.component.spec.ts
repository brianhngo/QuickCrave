import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFilterComponent } from './icon-filter.component';

describe('IconFilterComponent', () => {
  let component: IconFilterComponent;
  let fixture: ComponentFixture<IconFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
