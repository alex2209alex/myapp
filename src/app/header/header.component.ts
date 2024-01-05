import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuth = false;

  constructor(private router: Router, private authService: AuthService) {
    this.userSub = new Subscription();
  }
  
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuth = user ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  navigateToUrl(url: string) {
    this.router.navigate([url]);
  }
}
