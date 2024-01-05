// Folosit cursul lui maximilian de pe udemy
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCE80JJw818cJrNHoDfftVkhJRDRS4xAu4', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap(resData => {
      const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
      this.user.next(user);
      this.autoLogout(+resData.expiresIn * 1000);
      localStorage.setItem('user', JSON.stringify(user));
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCE80JJw818cJrNHoDfftVkhJRDRS4xAu4', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap(resData => {
      const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
      const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
      this.user.next(user);
      this.autoLogout(+resData.expiresIn * 1000);
      localStorage.setItem('user', JSON.stringify(user));
    }));
  }

  autoLogin() {
    const userData = localStorage.getItem('user');
    if (!userData) {
      return;
    }
    const parsedUserData = JSON.parse(userData);
    const user = new User(parsedUserData.email, parsedUserData.id, parsedUserData._token, new Date(parsedUserData._tokenExpirationDate));
    if (user.token) {
      this.user.next(user);
      const expirationDuration = new Date(parsedUserData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['']);
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
      this.tokenTimer = null;
    }
  }

  autoLogout(expirationTime: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }
}
