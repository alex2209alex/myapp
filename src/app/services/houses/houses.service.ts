import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { House } from 'src/app/models/house.model';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  constructor(private http: HttpClient) { }

  addHouse(house: House) {
    return this.http.post('https://buy-a-house-631a8-default-rtdb.firebaseio.com/houses.json', house);
  }

  getHouses() {
    return this.http.get('https://buy-a-house-631a8-default-rtdb.firebaseio.com/houses.json')
  }
}
