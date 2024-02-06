import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading = false;
  myForm: FormGroup;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'passwordConfirmation': [null, [Validators.required]],
    });
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    const email = this.myForm.value.email;
    const password = this.myForm.value.password;
    const passwordConfirmation = this.myForm.value.passwordConfirmation;

    if (this.myForm.invalid || password !== passwordConfirmation) {
      return;
    }

    this.isLoading = true;

    this.authService.register(email, password).subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['']);
    }, err => {
      alert(err.error.error.message);
      this.isLoading = false;
    });

    this.myForm.reset();
  }
}
