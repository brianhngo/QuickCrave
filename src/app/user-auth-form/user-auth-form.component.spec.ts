import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthFormComponent } from './user-auth-form.component';

describe('UserAuthFormComponent', () => {
  let component: UserAuthFormComponent;
  let fixture: ComponentFixture<UserAuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuthFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
