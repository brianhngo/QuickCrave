import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCarAsDefaultModalComponent } from './set-car-as-default-modal.component';

describe('SetCarAsDefaultModalComponent', () => {
  let component: SetCarAsDefaultModalComponent;
  let fixture: ComponentFixture<SetCarAsDefaultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetCarAsDefaultModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetCarAsDefaultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
