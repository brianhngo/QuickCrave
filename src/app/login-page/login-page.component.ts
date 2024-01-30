import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  providers: [AuthService],
})
export class LoginPageComponent {
  constructor(public AuthService: AuthService) {}
}
