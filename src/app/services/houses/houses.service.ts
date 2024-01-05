// Folosit cursul lui maximilian de pe udemy
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { House } from 'src/app/models/house.model';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousesService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  addHouse(house: House) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.post('https://buy-a-house-631a8-default-rtdb.firebaseio.com/houses.json?auth=' + user!.token, house);
    }));
  }

  getHouses() {
    return this.http.get('https://buy-a-house-631a8-default-rtdb.firebaseio.com/houses.json')
  }
}
