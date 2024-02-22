import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { auth } from '../../firebase.config';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',

  providers: [AuthService],
})
export class NavigationBarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  isLoggedIn: boolean = false;
  currentRoute: string = this.router.url;

  navigateAndSetState(route: 'signin' | 'signup'): void {
    this.authService.showSignIn = route;
    this.router.navigate([`${route}`]);
  }

  ngOnInit(): void {
    this.authService.authenticateUser();

    auth.onAuthStateChanged((user) => {
      this.authService.userAuthentication = user;
      this.isLoggedIn = !!user; // Set isLoggedIn based on whether user is present
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  // Home Page and Login. When you go to signup/login route, the button disappear
  isHidden(): boolean {
    const currentUrl = this.router.url;
    if (currentUrl === '/signin' || currentUrl === '/signup') {
      return true;
    } else {
      return false;
    }
  }

  // Function to render what navbar we are showing.
}
