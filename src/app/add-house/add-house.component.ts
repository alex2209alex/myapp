import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HousesService } from '../services/houses/houses.service';
import { House } from '../models/house.model';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent {
  myForm: FormGroup;
  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';


  constructor(private router: Router, private fb: FormBuilder, private housesService: HousesService) {
    this.myForm = this.fb.group({
      'title': [null, [Validators.required, Validators.maxLength(40)]],
      'urlImg': [null, [Validators.required, Validators.pattern(this.reg)]],
      'description': [null, [Validators.required, Validators.maxLength(200)]],
      'price': [null, [Validators.required, Validators.min(0)]]
    });
  }

  navigateToMyHouses() {
    this.router.navigate(['me', 'houses']);
  }

  onSubmit() {
    const title = this.myForm.value.title;
    const urlImg = this.myForm.value.urlImg;
    const description = this.myForm.value.description;
    const price = this.myForm.value.price;

    if (this.myForm.invalid) {
      return;
    }

    const house: House = {
      id: null,
      email: JSON.parse(localStorage.getItem('user')!).email,
      urlImg: urlImg,
      title: title,
      description: description,
      price: price
    };

    this.housesService.addHouse(house).subscribe(() => {
      this.router.navigate(['me', 'houses']);
    }, err => {
      alert(err.error.error.message);
    });
  }
}
