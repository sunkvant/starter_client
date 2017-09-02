import { Injectable } from '@angular/core';
import {HttpClient} from "../http-client";
import {environment} from "../../environments/environment";


const API_URL = environment.apiUrl;

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  addProject(project){
    return this.http
      .post(API_URL + 'api/project/', project)
      .map(response => {
        //console.log(response);
        return response;
      });

  }
}
