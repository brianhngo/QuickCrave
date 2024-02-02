import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  showSignIn: 'signin' | 'signup' = 'signin';

  toggleContent(status: string): void {
    console.log(this.showSignIn);
    if (status === 'signin') {
      this.showSignIn = 'signin';
    } else if (status === 'signup') {
      this.showSignIn = 'signup';
    }
  }

  constructor() {}
}
