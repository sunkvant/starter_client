import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '../http-client';

const API_URL = environment.apiUrl;

@Injectable()
export class CountryService {

  countries: String[] = [];

  constructor(private http: HttpClient) { }

  getAllCountries(){

    this.http
      .get(API_URL + '/api/countries')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(country => {
          this.countries[i] = String();
          this.countries[i] = country;
          i++;
          return this.countries;
        });
      });
    return this.countries;
  }

}
