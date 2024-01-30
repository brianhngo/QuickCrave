import { Component } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [LoginPageComponent, SignUpComponent, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [AuthService],
})
export class ModalComponent {
  constructor(public AuthService: AuthService) {}
}
