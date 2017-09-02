import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Skill} from "../entity/skill";
import {HttpClient} from "../http-client";

const API_URL = environment.apiUrl;

@Injectable()
export class SkillService {

  skills: String[] = [];

  constructor(private http: HttpClient) { }

  getAllSkills(){

    this.http
      .get(API_URL + '/api/skills')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(skill => {
          this.skills[i] = String();
          this.skills[i] = skill;
          i++;
          return this.skills;
        });
      });
    return this.skills;
  }

  updateSkills(skills){
    return this.http
      .post(API_URL + 'api/profile/skills', skills)
      .map(response => {
        //console.log(response);
        return response;
      });

  }
}
