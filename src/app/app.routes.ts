import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserAuthFormComponent } from './user-auth-form/user-auth-form.component';
import { CreateUserAuthFormComponent } from './create-user-auth-form/create-user-auth-form.component';

export const routes: Routes = [
  { path: 'signin', component: UserAuthFormComponent },
  { path: 'signup', component: CreateUserAuthFormComponent },
  { path: '', component: LandingpageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
