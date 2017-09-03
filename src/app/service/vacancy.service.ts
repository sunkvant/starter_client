import { Injectable } from '@angular/core';
import {HttpClient} from '../http-client';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class VacancyService {
   positions: String[] = [];

  constructor(private http: HttpClient) { }

  addVacancy(vacancy, projectId){
    return this.http
      .post(API_URL + 'api/project/' + projectId + '/vacancy', vacancy)
      .map(response => {
        //console.log(response);
        return response;
      });
  }
  deleteVacancy(id, projectId){
    return this.http
      .delete(API_URL + 'api/project/' + projectId + '/vacancy/ '+ id)
      .map(response => {
        //console.log(response);
        return response;
      });
  }

  getAllPositions(){
     this.http
      .get(API_URL + 'api/positions')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(position => {
          this.positions[i] = String();
          this.positions[i] = position;
          i++;
          return this.positions;
        });
      });

     return this.positions;
  }

}
