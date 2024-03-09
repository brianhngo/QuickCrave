import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBillingModalComponent } from './delete-billing-modal.component';

describe('DeleteBillingModalComponent', () => {
  let component: DeleteBillingModalComponent;
  let fixture: ComponentFixture<DeleteBillingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBillingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteBillingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
