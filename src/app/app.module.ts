import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MatDialogModule,  MatCardModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CentralComponent } from './components/central/central.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './directives/alert.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './components/forgot-password/confirm-password.component';

import { UserService } from './services/user.service';
import { CityCountryService } from './services/city-country.service';
import { AlertService } from './services/alert.service';
import { TokenService } from './services/token.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangePersonalInfoComponent } from './components/change-personal-info/change-personal-info.component';


@NgModule({
  declarations: [
    AppComponent,
    CentralComponent,
    LoginDialogComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmPasswordComponent,
    AlertComponent,
    UserProfileComponent,
    ChangePersonalInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path : '',
          component : CentralComponent
        },
        {
          path : 'register',
          component : RegisterComponent
        },
        {
          path : 'passwordReset',
          component : ForgotPasswordComponent
        },
        {
          path : 'passwordReset/:username',
          component : ConfirmPasswordComponent
        },
        {
          path: 'myProfile/:username',
          component : UserProfileComponent
        }
      ])
  ],
  entryComponents: [LoginDialogComponent],
  providers: [UserService, CityCountryService, AlertService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
