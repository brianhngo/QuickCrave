import { Injectable } from '@angular/core';
import { auth } from './firebase.config'; // Import the necessary Firebase modules
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  showSignIn: 'signin' | 'signup' = 'signin';

  toggleContent(status: string): void {
    if (status === 'signin') {
      this.showSignIn = 'signin';
    } else if (status === 'signup') {
      this.showSignIn = 'signup';
    }
  }

  userAuthentication: any = null;

  authenticateUser(): any {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      this.userAuthentication = user;
    });

    return () => {
      unsubscribe();
    };
  }

  logoutUser(): void {
    auth.signOut();
    this.userAuthentication = null;
  }
}
