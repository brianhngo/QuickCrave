import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isModalOpen: boolean = false;
  modalCurrentView: 'signin' | 'signup' = 'signin';

  ModalHandler(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  openSignInModal() {
    this.modalCurrentView = 'signin';
  }

  openSignUpModal() {
    this.modalCurrentView = 'signup';
  }

  closeModal() {
    this.isModalOpen = false;
  }

  changeModal() {
    if (this.modalCurrentView === 'signin') {
      this.modalCurrentView = 'signup';
    } else {
      this.modalCurrentView = 'signin';
    }
  }

  constructor() {}
}
