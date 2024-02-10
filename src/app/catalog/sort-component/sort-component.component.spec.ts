import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortComponentComponent } from './sort-component.component';

describe('SortComponentComponent', () => {
  let component: SortComponentComponent;
  let fixture: ComponentFixture<SortComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
