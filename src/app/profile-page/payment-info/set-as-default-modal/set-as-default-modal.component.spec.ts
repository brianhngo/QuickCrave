import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAsDefaultModalComponent } from './set-as-default-modal.component';

describe('SetAsDefaultModalComponent', () => {
  let component: SetAsDefaultModalComponent;
  let fixture: ComponentFixture<SetAsDefaultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetAsDefaultModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetAsDefaultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
