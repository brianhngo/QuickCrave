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

  isModalOpen: boolean = true;
  modalCurrentView: 'signin' | 'signup' = 'signin';

  ModalHandler(): void {
    console.log('hi');
    this.isModalOpen = !this.isModalOpen;
  }

  openSignInModal(): void {
    console.log(this.isModalOpen);
    console.log('2');
    this.isModalOpen = true;
    this.modalCurrentView = 'signin';
  }

  openSignUpModal(): void {
    console.log(this.isModalOpen);
    console.log('1');
    this.isModalOpen = true;
    this.modalCurrentView = 'signup';
  }

  closeModal(): void {
    this.isModalOpen = false;
    console.log(this.isModalOpen);
  }

  changeModal(): void {
    console.log('hello');
    if (this.modalCurrentView === 'signin') {
      this.modalCurrentView = 'signup';
    } else {
      this.modalCurrentView = 'signin';
    }
  }

  constructor() {}
}
