import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MatDialogModule,  MatCardModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserService } from './services/user.service';
import { CityCountryService } from './services/city-country.service';
import { AlertService } from './services/alert.service';
import { TokenService } from './services/token.service';
import { ReservationService } from './services/reservation.service';
import { BookingUnitService } from './services/booking-unit.service';
import { MessageService } from './services/message.service';

import { AppComponent } from './app.component';
import { CentralComponent } from './components/central/central.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './directives/alert.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './components/forgot-password/confirm-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangePersonalInfoComponent } from './components/change-personal-info/change-personal-info.component';
import { ReservationPreviewComponent } from './components/reservation-preview/reservation-preview.component';
import { AllReservationsPreviewComponent} from './components/reservation-preview/all-reservations-preview.component';
import { ReservationPanelComponent } from './components/reservation-panel/reservation-panel.component';


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
    ChangePersonalInfoComponent,
    ReservationPreviewComponent,
    AllReservationsPreviewComponent,
    ReservationPanelComponent
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
  providers: [UserService, CityCountryService, AlertService, TokenService, ReservationService, BookingUnitService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
