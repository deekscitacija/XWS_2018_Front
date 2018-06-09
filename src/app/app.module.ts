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

import { UserService } from './services/user.service';
import { CityCountryService } from './services/city-country.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './components/forgot-password/confirm-password.component';
import { AlertService } from './services/alert.service';


@NgModule({
  declarations: [
    AppComponent,
    CentralComponent,
    LoginDialogComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ConfirmPasswordComponent,
    AlertComponent
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
        }
      ])
  ],
  entryComponents: [LoginDialogComponent],
  providers: [UserService, CityCountryService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
