import { Injectable } from '@angular/core';
import {HttpClient} from '../http-client';
import {environment} from '../../environments/environment';
import {Project} from '../entity/project';
import {ConverterService} from './converter.service';
import {SearchProject} from '../entity/search-project';


const API_URL = environment.apiUrl;

@Injectable()
export class ProjectService {

  private project: Project = new Project();
  private statuses: String[] = [];

  constructor(private http: HttpClient, private converterService: ConverterService) { }

  addProject(project){
    return this.http
      .post(API_URL + 'api/project/', project)
      .map(response => {
        //console.log(response);
        return response;
      });
  }

  updateProject(project){
    return this.http
      .put(API_URL + 'api/project/' + project.id, project)
      .map(response => {
        //console.log(response);
        return response;
      });
  }

  closeProject(id){
    return this.http
      .post(API_URL + 'api/project/' + id + '/close', null)
      .map(response => {
        //console.log(response);
        return response;
      });
  }

  getProjectById(id){
    return this.http
      .get(API_URL + 'api/project/' + id)
      .map(response => {
        if (response.status === 204){
          return null;
        }else{
          this.project = new Project(response.json()) ;
          return this.project;
        }
      });
  }

  getProjectByUid(uid){
    return this.http
      .get(API_URL + 'api/profile/' + uid + '/projects')
      .map(response => {
        if (response.status === 204){
          return null;
        }else{
          return response.json();
        }
      });
  }

  getStatuses(){
     this.http
      .get(API_URL + 'api/statuses')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(status => {
          this.statuses[i] = String();
          this.statuses[i] = status;
          i++;
          return this.statuses;
        });
      });
     return this.statuses;
  }

  searchProject(searchProject: SearchProject){
    return this.http
      .get(API_URL + 'api/project/search' + this.converterService.objToQuerry(searchProject))
      .map(response => {
        if (response.status === 204){
          return null;
        }else{
          return response.json();
        }
      });
  }

  getConsultation(uid, projectId){
    const message = {
      projectId: projectId,
      title: 'Запрос на консультацию',
      single: true,
      receiverPersonId: uid
    };

    return this.http
      .post(API_URL + '/api/message/consultationRequest', message)
      .map(response => {
        //console.log(response);
        return response;
      });
  }


  removeFromTeam(uid, projectId){
    return this.http
      .delete(API_URL + '/api/project/' + projectId + '/team/profile/' + uid)
      .map(response => {
        //console.log(response);
        return response;
      });
  }



}
