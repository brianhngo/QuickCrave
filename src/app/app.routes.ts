import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserAuthFormComponent } from './user-auth-form/user-auth-form.component';

export const routes: Routes = [
  { path: 'login', component: UserAuthFormComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', component: LandingpageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
