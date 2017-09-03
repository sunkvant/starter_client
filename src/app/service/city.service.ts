import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '../http-client';

const API_URL = environment.apiUrl;

@Injectable()
export class CityService {

  private cities: String[] = [];

  constructor(private http: HttpClient) { }

  getAllCitiesByCountry(country){

    this.http
      .get(API_URL + '/api/cities?country=' + country)
      .subscribe(response => {
        let i = 0;
        response.json().forEach(city => {
          this.cities[i] = String();
          this.cities[i] = city;
          i++;
          return this.cities;
        });
      });
    return this.cities;
  }

  getAllCities(){

    this.http
      .get(API_URL + 'api/cities')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(city => {
          this.cities[i] = String();
          this.cities[i] = city;
          i++;
          return this.cities;
        });
      });
    return this.cities;
  }




}
