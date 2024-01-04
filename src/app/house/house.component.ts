import { Component, Input } from '@angular/core';
import { House } from '../models/house.model';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent {
  isNumberShown: boolean = false;

  @Input() house: House | undefined = undefined;

  showPhoneNumber() {
    this.isNumberShown = true;
  }
}
