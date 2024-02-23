import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserAuthFormComponent } from './user-auth-form/user-auth-form.component';
import { CreateUserAuthFormComponent } from './create-user-auth-form/create-user-auth-form.component';
import { CatalogComponent } from './catalog/catalog.component';
import { RestaurantCardComponent } from './catalog/restaurant-card/restaurant-card.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const routes: Routes = [
  { path: 'signin', component: UserAuthFormComponent },
  { path: 'signup', component: CreateUserAuthFormComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'restaurantCard', component: RestaurantCardComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '', component: LandingpageComponent, pathMatch: 'full' },

  { path: '**', redirectTo: '/' },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
