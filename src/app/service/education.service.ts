import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Education} from "../entity/education";
import {HttpClient} from "../http-client";


const API_URL = environment.apiUrl;

@Injectable()
export class EducationService {
  educations: Education[] = [];

  constructor(private http: HttpClient) { }

  getAllEducations(){

    this.http
      .get(API_URL + '/api/educations')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(education => {
          this.educations[i] = new Education();
          this.educations[i] = education;
          i++;
          return this.educations;
        });
      });
    return this.educations;
  }

  updateEducation(education: Education){

    return this.http
      .put(API_URL + 'api/profile/education', education)
      .map(response => {
        //console.log(response);
        return response;
      });
  }

  deleteEducation(id){

    return this.http
      .delete(API_URL + 'api/profile/education/' + id)
      .map(response => {
        //console.log(response);
        return response;
      });
  }

  addEducation(education: Education){

    return this.http
      .post(API_URL + 'api/profile/education/' , education)
      .map(response => {
        //console.log(response);
        return response;
      });
  }


}
