import { Injectable } from '@angular/core';
import {HttpClient} from '../http-client';
import {environment} from '../../environments/environment';
import {SearchVacancy} from "../entity/search-vacancy";
import {ConverterService} from "./converter.service";

const API_URL = environment.apiUrl;

@Injectable()
export class VacancyService {
   positions: String[] = [];

  constructor(private http: HttpClient, private converterService: ConverterService) { }

  addVacancy(vacancy, projectId){
    return this.http
      .post(API_URL + 'api/project/' + projectId + '/vacancy', vacancy)
      .map(response => {
        //console.log(response);
        return response;
      });
  }

  requestVacancy( vacancyId){
    return this.http
      .post(API_URL + 'api/message/vacancyRequest/' + vacancyId , null )
      .map(response => {
        //console.log(response);
        return response;
      });
  }

  deleteVacancy(id, projectId){
    return this.http
      .delete(API_URL + 'api/project/' + projectId + '/vacancy/'+ id)
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

  searchVacancy(searchVacancy: SearchVacancy){
    return this.http
      .get(API_URL + 'api/vacancy/search' + this.converterService.objToQuerry(searchVacancy))
      .map(response => {
        if (response.status === 204){
          return null;
        }else{
          return response.json();
        }
      });
  }

  setUserOnVacancy(uid, vacancyId){
    return this.http
      .post(API_URL + '/api/project/team/profile/' + uid + '/vacancy/' + vacancyId +'/', null )
      .map(response => {
        //console.log(response);
        return response;
      });
  }

}
