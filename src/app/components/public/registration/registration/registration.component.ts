import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegistrationService} from '../../../../service/registration.service';
import {SecurityService} from '../../../../service/security.service';
import {TokenService} from "../../../../service/token.service";
declare var require: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    private image1 = require('./trainee.png');
  private image2 = require('./mentor-2.png');
    private image3 = require('./customer.png');

    role: String =  String();

  constructor(private route: Router, private registrationService: RegistrationService,
              private securityService: SecurityService) {

  }

  nextStepAsTrainee(){

    this.role = 'Trainee';

    if(localStorage.getItem('step') === 'social'){
      this.registrationService.setRole(this.role);
      if(localStorage.getItem('FB')){

        localStorage.removeItem('FB');
        this.registrationService.registration();
      }else {
        this.route.navigate(['register/skill']);
      }
    }else{
      this.registrationService.newUser();
      this.registrationService.setRole(this.role);
      localStorage.setItem('step', 'registration');
      this.route.navigate(['register/profile']);
    }

  }
  nextStepAsMentor(){
    this.role = 'Mentor';

    if(localStorage.getItem('step') === 'social'){
      this.registrationService.setRole(this.role);
      if(localStorage.getItem('FB')){

        localStorage.removeItem('FB');
        this.registrationService.registration();
      }else{
        this.route.navigate(['register/skill']);
      }

    }else {
      this.registrationService.newUser();
      this.registrationService.setRole(this.role);
      localStorage.setItem('step', 'registration');
      this.route.navigate(['register/profile']);
    }
  }
  nextStepAsCustomer() {
    this.role = 'Customer';
    if (localStorage.getItem('step') === 'social') {
      this.registrationService.setRole(this.role);


      localStorage.removeItem('FB');
      this.registrationService.registration();
    } else {
      this.registrationService.newUser();

      this.registrationService.setRole(this.role);
      localStorage.setItem('step', 'registration');
      this.route.navigate(['register/profile']);
    }
  }

  ngOnInit() {
    if(localStorage.getItem('FB')){
      this.registrationService.checkLogin(this.registrationService.getLogin()).subscribe(checkLogin => {

        if (checkLogin){

          localStorage.removeItem('FB');
          this.registrationService.getToken();

        }
      });
    }

    if (this.securityService.checkSecurityStatus()){
      this.route.navigate(['profile/']);
    }
  }

}
