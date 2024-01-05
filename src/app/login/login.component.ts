import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm: FormGroup;
  isLoading = false;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.myForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required]]
    });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }

  onSubmit() {
    const email = this.myForm.value.email;
    const password = this.myForm.value.password;

    if (this.myForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.login(email, password).subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['']);
    }, err => {
      alert(err.error.error.message);
      this.isLoading = false;
    });

    this.myForm.reset();
  }
}
