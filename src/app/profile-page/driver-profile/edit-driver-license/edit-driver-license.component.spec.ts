import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDriverLicenseComponent } from './edit-driver-license.component';

describe('EditDriverLicenseComponent', () => {
  let component: EditDriverLicenseComponent;
  let fixture: ComponentFixture<EditDriverLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDriverLicenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDriverLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
