import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillingModalComponent } from './add-billing-modal.component';

describe('AddBillingModalComponent', () => {
  let component: AddBillingModalComponent;
  let fixture: ComponentFixture<AddBillingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBillingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBillingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
