import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDriverLicenseInfoComponent } from './view-driver-license-info.component';

describe('ViewDriverLicenseInfoComponent', () => {
  let component: ViewDriverLicenseInfoComponent;
  let fixture: ComponentFixture<ViewDriverLicenseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDriverLicenseInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDriverLicenseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
