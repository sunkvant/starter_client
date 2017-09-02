import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "../http-client";

const API_URL = environment.apiUrl;

@Injectable()
export class CategoryService {



  constructor(private http: HttpClient) { }

  categories: String[] = [];

  getAllCategories(){

    this.http
      .get(API_URL + '/api/categories')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(category => {
          this.categories[i] = String();
          this.categories[i] = category;
          i++;
          return this.categories;
        });
      });
    return this.categories;
  }
}
