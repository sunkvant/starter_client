import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "../http-client";

const API_URL = environment.apiUrl;

@Injectable()
export class LanguageService {

  constructor(private http: HttpClient) { }

  languages: String[] = [];

  getAllLanguages(){

    this.http
      .get(API_URL + '/api/languages')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(language => {
          this.languages[i] = String();
          this.languages[i] = language;
          i++;
          return this.languages;
        });
      });
    return this.languages;
  }
}
