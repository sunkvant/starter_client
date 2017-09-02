import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "../http-client";
import {Course} from "../entity/course";

const API_URL = environment.apiUrl;

@Injectable()
export class CourseService {
  courses: Course[] = [];

  constructor(private http: HttpClient) { }

  getAllCourses(){

    this.http
      .get(API_URL + '/api/courses')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(course => {
          this.courses[i] = new Course();
          this.courses[i] = course;
          i++;
          return this.courses;
        });
      });
    return this.courses;
  }

  updateCourse(course: Course){
    return this.http
      .put(API_URL + 'api/profile/course', course)
      .map(response => {
        //console.log(response);
        return response;
      });
  }

  deleteCourse(id){

    return this.http
      .delete(API_URL + 'api/profile/course/' + id)
      .map(response => {
        //console.log(response);
        return response;
      });
  }

  addCourse(course: Course){

    return this.http
      .post(API_URL + 'api/profile/course/' , course)
      .map(response => {
        //console.log(response);
        return response;
      });
  }
}
