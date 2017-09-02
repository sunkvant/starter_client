import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Profile} from "../../../../entity/profile";
import {PasswordValidation} from "./PasswordValidation";
import {CountryService} from "../../../../service/country.service";

import {CityService} from "../../../../service/city.service";
import {Router} from "@angular/router";
import {RegistrationService} from "../../../../service/registration.service";

declare var require: any;

@Component({
  selector: 'app-registrationprofile',
  templateUrl: './registrationprofile.component.html',
  styleUrls: ['./registrationprofile.component.css']
})
export class RegistrationprofileComponent implements OnInit {
    private noimage = require('./img/noPhoto.jpg');
  user: Profile = new Profile();
  countries: String[] = [];
  cities: String[] = [];
  form: FormGroup;
  role: String;
   birth = '1999-01-01';
   loginCheck: boolean;

  nextStep() {

    this.user.contact.dateOfBirth = Date.parse(this.birth);
    localStorage.setItem('step', 'profile');
    this.registrationService.setProfile(this.user);
    this.route.navigate(['register/education']);
  }



  constructor(fb: FormBuilder, private countryService: CountryService, private cityService: CityService,
              private route: Router, private registrationService: RegistrationService) {

   // console.log(this.registrationService.checkUserStatus());
    this.role = this.registrationService.getRole();
    this.form = fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword // your validation method
    });

    this.countries = this.countryService.getAllCountries();
  }

  setCities(){
    this.cities = this.cityService.getAllCitiesByCountry(this.user.contact.location.country);
  }

  registration(){

    localStorage.removeItem('step');
    this.user.contact.dateOfBirth = Date.parse(this.birth);

    this.registrationService.setProfile(this.user);
    this.registrationService.registration();

  }

  checkLogin(login){
    this.registrationService.checkLogin(login).subscribe(loginCheck => {
      this.loginCheck = loginCheck;
    });

  }
  ngOnInit() {
    if ((localStorage.getItem('step') !== 'registration') || (!this.registrationService.getRole())){
      localStorage.removeItem('step');
      this.route.navigate(['/register']);
    }

  }

}
