import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-create-user-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    SignUpComponent,
  ],
  templateUrl: './create-user-auth-form.component.html',
  styleUrl: './create-user-auth-form.component.css',
  providers: [AuthService],
})
export class CreateUserAuthFormComponent {
  constructor(public authService: AuthService) {}
}
