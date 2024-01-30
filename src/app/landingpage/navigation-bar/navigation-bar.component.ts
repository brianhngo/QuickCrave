import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
  providers: [AuthService],
})
export class NavigationBarComponent {
  constructor(public AuthService: AuthService) {}
}
