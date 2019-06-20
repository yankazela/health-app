import { SignupComponent } from './signup/signup.component'
import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { ForumLandingPageComponent } from './forum-landing-page/forum-landing-page.component'
import { DoctorsDetailsComponent } from './doctors-details/doctors-details.component'
import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component' 

export const APP_ROUTES: Routes = [
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard/league/:leaguename', component: ForumLandingPageComponent},
    {path: 'healthpro', component: DoctorsDetailsComponent},
    {path: 'editprofile', component: ProfileComponent}
]
