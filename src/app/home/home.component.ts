import { Component } from '@angular/core';
import { House } from '../models/house.model';
import { ActivatedRoute } from '@angular/router';
import { HousesService } from '../services/houses/houses.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loadedHouses: House[] = [];
  isRouteHome: boolean = true;

  constructor(private housesService: HousesService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.route.toString() === 'Route(url:\'me/houses\', path:\'me/houses\')') {
      this.isRouteHome = false;
    }
    this.getHouses();
  }

  addHouse(house: House): void {
    this.housesService.addHouse(house).subscribe(responseData => {
      console.log(responseData);
    });
  }

  getHouses(): void {
    this.housesService
      .getHouses()
      .pipe(map(responseData => {
        const housesArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            // @ts-ignore
            housesArray.push({...responseData[key], id: key});
          }
        }
        return housesArray;
      }))
      .subscribe(responseData => {
        this.loadedHouses = responseData;
      });
  }
}
