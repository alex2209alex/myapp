import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { authGuard } from './auth/auth.guard';
import { notAuthGuard } from './auth/not-auth.guard';
import { AddHouseComponent } from './add-house/add-house.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full" },
  { path: 'me/houses', component: HomeComponent, pathMatch: "full", canActivate: [authGuard] },
  { path: 'houses/add', component: AddHouseComponent, pathMatch: "full", canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, pathMatch: "full", canActivate: [notAuthGuard] },
  { path: 'register', component: RegisterComponent, pathMatch: "full", canActivate: [notAuthGuard] },
  { path: 'logout', component: LogoutComponent, pathMatch: "full", canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
