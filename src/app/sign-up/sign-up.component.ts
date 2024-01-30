import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [AuthService],
})
export class SignUpComponent {
  constructor(public AuthService: AuthService) {}
}
