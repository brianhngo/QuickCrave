import { Component, NgZone } from '@angular/core';
import { AuthService } from '../../auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',

  providers: [AuthService],
})
export class NavigationBarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  navigateAndSetState(route: any): void {
    this.authService.showSignIn = route;
    console.log(this.authService.showSignIn);
    this.router.navigate(['/login']);
  }
}
