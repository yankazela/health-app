import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { DoctorsDetailsComponent } from './doctors-details/doctors-details.component'
import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component' 

export const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'healthpro', component: DoctorsDetailsComponent},
    {path: 'editprofile', component: ProfileComponent}
]
