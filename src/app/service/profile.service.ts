import { Injectable } from '@angular/core';
import {Profile} from '../entity/profile';
import {environment} from '../../environments/environment';
import { HttpClient } from '../http-client';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {SearchProfile} from "../entity/search-profile";

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

  searchProfile(searchProfile: SearchProfile){

    /*let params: URLSearchParams = new URLSearchParams(searchProfile);
    params.set('appid', StaticSettings.API_KEY);
    params.set('cnt', days.toString());
*/

    /*let searchString;
    if(searchProfile.skills.length !== 0){
      searchString += ''
    }
    searchProfile.skills.forEach( skill => {

    })*/


    return this.http
      .get(API_URL + 'api/profile/search' + this.obj_to_query(searchProfile))
      .map(response => {
        if (response.status === 204){
          return null;
        }else{
          return response.json();
        }

      });
  }

  obj_to_query(obj) {
    let parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if(obj[key]!==null){
          parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
      }
    }
    return "?" + parts.join('&');
  }

}
