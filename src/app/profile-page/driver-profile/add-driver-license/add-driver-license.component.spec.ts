import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDriverLicenseComponent } from './add-driver-license.component';

describe('AddDriverLicenseComponent', () => {
  let component: AddDriverLicenseComponent;
  let fixture: ComponentFixture<AddDriverLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDriverLicenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDriverLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
