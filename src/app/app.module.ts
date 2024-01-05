import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HouseComponent } from './house/house.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { LogoutComponent } from './logout/logout.component';
import { AddHouseComponent } from './add-house/add-house.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HouseComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LoadingSpinnerComponent,
    LogoutComponent,
    AddHouseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
