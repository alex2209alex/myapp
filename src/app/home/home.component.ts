import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { House } from '../models/house.model';
import { HousesService } from '../services/houses/houses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loadedHouses: House[] = [];
  filteredLoadedHouses: House[] = [];
  isRouteHome: boolean = true;
  isLoading = true;

  constructor(private housesService: HousesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.route.toString() === 'Route(url:\'me/houses\', path:\'me/houses\')') {
      this.isRouteHome = false;
    }
    this.getHouses();
  }

  addHouse(): void {
    this.router.navigate(['/houses', 'add']);
  }

  getHouses(): void {
    this.housesService
      .getHouses()
      .pipe(map(responseData => {
        const housesArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            // @ts-ignore
            housesArray.push({ ...responseData[key], id: key });
          }
        }
        return housesArray;
      }))
      .subscribe(responseData => {
        this.loadedHouses = responseData;
        if (!this.isRouteHome) {
          this.filteredLoadedHouses = this.loadedHouses.filter(house => house.email === JSON.parse(localStorage.getItem('user')!).email);
        }
        this.isLoading = false;
      });
  }
}
