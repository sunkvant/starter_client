import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Workplace} from "../entity/workplace";
import {HttpClient} from "../http-client";

const API_URL = environment.apiUrl;

@Injectable()
export class WorkplaceService {

  workplaces: Workplace[] = [];

  constructor(private http: HttpClient) { }

  getAllWorkplaces(){

    this.http
      .get(API_URL + '/api/workplaces')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(workplace => {
          this.workplaces[i] = new Workplace();
          this.workplaces[i] = workplace;
          i++;
          return this.workplaces;
        });
      });
    return this.workplaces;
  }

  updateWorkplace(workplace: Workplace) {

    return this.http
      .put(API_URL + 'api/profile/workplace', workplace)
      .map(response => {
        //console.log(response);
        return response;
      });
  }

    deleteWorkplace(id){
      return this.http
        .delete(API_URL + 'api/profile/workplace/'+id)
        .map(response => {
          //console.log(response);
          return response;
        });
    }

  addWorkplace(workplace: Workplace){

    return this.http
      .post(API_URL + 'api/profile/workplace/' , workplace)
      .map(response => {
        //console.log(response);
        return response;
      });
  }


}
