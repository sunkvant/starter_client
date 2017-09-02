import { Injectable } from '@angular/core';
import {Profile} from '../entity/profile';
import {Education} from '../entity/education';
import {Workplace} from '../entity/workplace';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';
import {Timestamp} from 'rxjs/Rx';
import {TokenService} from './token.service';
import {HttpClient} from '../http-client';
import {Router} from '@angular/router';
declare var VK: any;
declare var FB: any;
declare var IN: any;

const API_URL = environment.apiUrl;
@Injectable()
export class RegistrationService {
  public profile: Profile = new Profile();
  private check: boolean;

  constructor(private http: Http, private tokenService: TokenService, private route: Router  ) {
    this.http = http;
  }


 getLogin(){
    return this.profile.login;
 }
  getFBInfo() {

    this.profile = new Profile();
    FB.login(response => {
      if (response.status === 'connected') {


        const uid = response.authResponse.userID;
        const token = response.authResponse.accessToken;

        this.profile.direction='Java Developer';
        this.profile.login = uid;
        this.profile.password = uid;

        localStorage.setItem('step', 'social');
        localStorage.setItem('FB', 'FB');
        this.route.navigate(['/register']);



       return FB.api('/' + uid, 'get', {access_token: token, fields: 'id,name,email,gender,birthday,cover,education,hometown,languages,work'},
          r => {
            if (r && !r.error) {
              console.log(r);

              //this.profile.role.id = 4;

              this.profile.contact.fullName = r.name;
              this.profile.contact.email = r.email;

              let i = 0;
              r.education.forEach(university => {
                this.profile.educations[i] = new Education();
                this.profile.educations[i].speciality = university.concentration[0].name;
                this.profile.educations[i].name = university.school.name;
                this.profile.educations[i].graduationYear = 0;
                i++;
              });

              i = 0;
              r.work.forEach(career => {
                this.profile.workplaces[i] = new Workplace();
                this.profile.workplaces[i].company = career.employer.name;
                this.profile.workplaces[i].position = career.position.name;
                i++;
              });

              FB.api('/' + uid + '/picture', 'get',
                picture => {
                  this.profile.contact.avatarPath = picture.data.url;
                  console.log(this.profile);
                });
          }


        });
        // Logged into your app and Facebook.
      }
    },
    {
      scope: 'user_birthday, email, public_profile, user_about_me, user_education_history, user_hometown, user_photos, user_work_history, user_location', return_scopes : true
    });



  }


  getVKInfo(): Profile{

    this.profile = new Profile();
    let uid;
    let access_token;
    VK.Auth.login(response => {
      if (response.session) {

        uid = response.session.mid;
        access_token = response.session.access_token;

        this.profile.login = uid;
        this.profile.password = uid;
        //console.log(response);

        if (response.session.user.email) {
          this.profile.contact.email = response.session.user.email;
        }else{
          this.profile.contact.email = '';
        }

        //console.log(this.profile);
        this.checkLogin(uid).subscribe(checkLogin => {
          if (checkLogin){

            this.getToken();

          }else{
             VK.Api.call('users.get', {
                users_ids: uid,
                access_token: access_token,
                fields: 'sex, contacts, about, bdate,connections, city, country, home_town, photo_max, universities, schools, career',
                v: '5.68'
              },
              user => {

                const userInfo = user.response[0];

                //console.log(userInfo);
                //this.profile.direction.id = 1;

                //this.profile.role = 4;

                if (userInfo.skype) {
                  this.profile.contact.skype = userInfo.skype;
                }else{
                  this.profile.contact.skype = '';
                }

                if (userInfo.about) {
                  this.profile.contact.about = userInfo.about;
                }else{
                  this.profile.contact.about = '';
                }

                if (userInfo.mobile_phone) {
                  this.profile.contact.phone = userInfo.mobile_phone;
                }else{
                  this.profile.contact.phone = '';
                }
                this.profile.contact.fullName = userInfo.first_name + ' ' + userInfo.last_name;

                if (userInfo.photo_max) {
                  this.profile.contact.avatarPath = userInfo.photo_max;
                }else{
                  this.profile.contact.avatarPath = '';
                }

                if (userInfo.bdate) {
                  this.profile.contact.dateOfBirth = Date.parse(userInfo.bdate);
                }else{
                  this.profile.contact.dateOfBirth = 0;
                }

                if (userInfo.city.title) {
                  this.profile.contact.location.city = userInfo.city.title;
                }else{
                  this.profile.contact.location.city = '';
                }

                if (userInfo.country.title) {
                  this.profile.contact.location.country = userInfo.country.title;
                }else{
                  this.profile.contact.location.country = '';
                }

                let i = 0;
                userInfo.universities.forEach(university => {
                  this.profile.educations[i] = new Education();

                  if (university.faculty_name) {
                    this.profile.educations[i].faculty = university.faculty_name;
                  }else{
                    this.profile.educations[i].faculty = '';
                  }

                  if (university.graduation) {
                    this.profile.educations[i].graduationYear = university.graduation;
                  }else{
                    this.profile.educations[i].graduationYear = 0;
                  }

                  if (university.chair_name) {
                    this.profile.educations[i].speciality = university.chair_name;
                  }else{
                    this.profile.educations[i].speciality = '';
                  }

                  if (university.name) {
                    this.profile.educations[i].name = university.name;
                  }else{
                    this.profile.educations[i].name = '';
                  }

                  if (university.education_form) {
                    this.profile.educations[i].educationType = university.education_form;
                  }else{
                    this.profile.educations[i].educationType = '';
                  }
                  i++;
                });

                i = 0;
                userInfo.career.forEach(career => {
                  this.profile.workplaces[i] = new Workplace();

                  if (career.company) {
                    this.profile.workplaces[i].company = career.company;
                  }else{
                    this.profile.workplaces[i].company = '';
                  }
                  if (career.until) {
                    this.profile.workplaces[i].endWork = Date.parse(career.until);
                  } else {
                    this.profile.workplaces[i].working = true;
                  }

                  if (career.from) {
                    this.profile.workplaces[i].startWork = Date.parse(career.from);
                  }else{
                    this.profile.workplaces[i].startWork = 0;
                  }

                  if (career.from) {
                    this.profile.workplaces[i].position = career.position;
                  }else{
                    this.profile.workplaces[i].position = '';
                  }
                  i++;
                });



                //this.registration();

                /*   this.http.post(API_URL + 'api/profile/', this.profile)
                     .subscribe(r => {
                       if (r && r.statusText === 'OK'){

                         this.tokenService.getToken(this.profile.login,this.profile.password);

                       }
                     });*/
              });
            localStorage.setItem('step', 'social');
            this.route.navigate(['/register'], { replaceUrl: true });

          }
        });


      } else {
        /* Пользователь нажал кнопку Отмена в окне авторизации */
      }

    });

    return this.profile;
  }


  loginVK() {

    return this.getVKInfo();

  }

  newUser(){
    this.profile = new Profile();
  }

  setRole(role){
    this.profile.role = role;
  }
  getRole(){
    return this.profile.role;
  }

  setProfile(profile){
    this.profile.contact = profile.contact;
    this.profile.login = profile.login;
    this.profile.password = profile.password;
  }

  setEducations(educations){

    this.profile.educations = educations;

  }

  setCourses(courses){
    this.profile.courses = courses;

  }

  setWorkplaces(workplaces){
    this.profile.workplaces = workplaces;
  }

  setSkills(skills){
    this.profile.skills = skills;
  }

  setDirection(direction){
    this.profile.direction = direction;
  }

  setMentorExp(mentorExp, expirince){
    this.profile.mentorExp = mentorExp;
    this.profile.experience = expirince;
  }

  checkUserStatus(){
    return this.profile;
  }

  registration(){
    //this.profile.direction = null;
    this.http.post(API_URL + 'api/profile/', this.profile)
      .subscribe(response => {
        if (response.status === 201){
          this.getToken();
        }
      },
      error => {
        console.log(error);
        return error;
      });
  }

    getToken(){
    this.tokenService.getToken(this.profile.login, this.profile.password).subscribe();
  }

  checkLogin(login){
    return this.http.get(API_URL + 'api/checklogin/' + login)
      .map(response => {
          if (response.status === 200){
            return(response.json());
          }
        });
  }

}
