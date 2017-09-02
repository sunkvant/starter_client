import { Injectable } from '@angular/core';
import {Profile} from '../entity/profile';
import {environment} from '../../environments/environment';
import { HttpClient } from '../http-client';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

const API_URL = environment.apiUrl;

@Injectable()
export class ProfileService {


  profile: Profile = new Profile();

  constructor(private http: HttpClient) {
    this.http  = http;
  }

  getProfileById(id: number): Observable<Profile>  {

    return this.http
      .get(API_URL + 'api/profile/' + id)
      .map(response => {
        if (response.status === 204){
          return null;
        }else{
          this.profile = new Profile(response.json()) ;
          return this.profile;
        }

      });

  }

  getProfile(): Observable<Profile>  {

    return this.http
      .get(API_URL + '/api/profile')
      .map(response => {
        this.profile = new Profile(response.json()) ;
        return this.profile;
      });
  }

  updateAvatar(formData){

    const headers: Headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    this.http.post(API_URL + 'api/avatar/upload', formData).subscribe(resp => {
      document.location.href = '/profile';
    });
  }

}
