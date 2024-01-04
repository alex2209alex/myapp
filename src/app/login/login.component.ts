import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required]]
    });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }

  onSubmit() {
    console.log(this.myForm.controls['email'].value + this.myForm.controls['password'].value);
    this.myForm.reset();
  }
}
