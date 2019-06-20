import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ControlFormService } from './control-form.service';
import { HttpRequestService } from './http-request.service'
import { CustExtBrowserXhr } from './cust-ext-browser-xhr';
import { BrowserXhr } from '@angular/http';

import { APP_ROUTES } from './app.routes';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForumLandingPageComponent } from './forum-landing-page/forum-landing-page.component';
import { DoctorsDetailsComponent } from './doctors-details/doctors-details.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component'

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    ForumLandingPageComponent,
    DoctorsDetailsComponent,
    LogoutComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    ControlFormService, 
    HttpRequestService, 
    {provide: BrowserXhr, useClass:CustExtBrowserXhr}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
