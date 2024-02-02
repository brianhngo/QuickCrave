import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserAuthFormComponent } from './create-user-auth-form.component';

describe('CreateUserAuthFormComponent', () => {
  let component: CreateUserAuthFormComponent;
  let fixture: ComponentFixture<CreateUserAuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserAuthFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserAuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
