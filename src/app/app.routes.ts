import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },

  { path: '**', redirectTo: '/' },
];
