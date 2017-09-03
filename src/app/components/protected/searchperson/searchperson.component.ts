import { Component, OnInit } from '@angular/core';
import {SearchProfile} from "../../../entity/search-profile";
import {DirectionService} from "../../../service/direction.service";
import {SkillService} from "../../../service/skill.service";
import {CityService} from "../../../service/city.service";
import {CountryService} from "../../../service/country.service";
import {EducationService} from "../../../service/education.service";
import {Education} from "../../../entity/education";
import {Profile} from "../../../entity/profile";
import {ProfileService} from "../../../service/profile.service";
import {isUndefined} from "util";
declare var require;

@Component({
  selector: 'app-searchperson',
  templateUrl: './searchperson.component.html',
  styleUrls: ['./searchperson.component.css']
})
export class SearchpersonComponent implements OnInit {
    roles: String[] =[];
    searchProfile: SearchProfile;
    directions: String[];
    bufferDirections: String[] = [];
    skills: String[];
    bufferSkills: String[];
    cities: String[];
    countries: String[];
    educations: Education[];
    searchResultProfiles: Profile[];
    anyRole: boolean;

  constructor(private directionService: DirectionService, private skillService: SkillService,
  private cityService: CityService, private countryService: CountryService, private educationService: EducationService,
  private profileService: ProfileService) {
    this.searchProfile = new SearchProfile();
    this.roles[0] = 'Mentor';
    this.roles[1] = 'Trainee';
    this.roles[2] = 'Customer';

    this.anyRole = false;
    //this.searchProfile.role = this.roles[0];
    this.bufferDirections = [];
    this.directions = this.directionService.getAllDirections();
    this.bufferSkills = [];
    this.skills = this.skillService.getAllSkills();
    this.countries = this.countryService.getAllCountries();
    this.cities = this.cityService.getAllCities();
    this.educations = this.educationService.getAllEducations();
  }

  toggleMultiSelect(event, val){
    event.preventDefault();
    if (this.bufferDirections.indexOf(val) === -1){
      this.bufferDirections = [...this.bufferDirections, val];
      //document.getElementById(val).style.setProperty('background-color','red');
      // $('#' + val).toggleClass('fa fa-check');
    }else{
      // document.getElementById(val).style.setProperty('background-color','');
      //$('#' + val).toggleClass('fa fa-check');
      this.bufferDirections = this.bufferDirections.filter(function(elem){
        return elem !== val;
      });
    }
  }
  toggleMultiSelectSkill(event, val){
    event.preventDefault();
    if (this.bufferSkills.indexOf(val) === -1){
      this.bufferSkills = [...this.bufferSkills, val];
      //document.getElementById(val).style.setProperty('background-color','red');
      // $('#' + val).toggleClass('fa fa-check');
    }else{
      // document.getElementById(val).style.setProperty('background-color','');
      //$('#' + val).toggleClass('fa fa-check');
      this.bufferSkills = this.bufferSkills.filter(function(elem){
        return elem !== val;
      });
    }
  }

  setCities(){
    this.cities = this.cityService.getAllCitiesByCountry(this.searchProfile.country);
  }

  search(){

      this.searchProfile.skills = this.bufferSkills;

      this.searchProfile.directions = this.bufferDirections;

      if(this.anyRole){
        this.searchProfile.role = null;
      }
      if(this.searchProfile.role === 'Customer'){
        this.searchProfile.skills = null;
        this.searchProfile.educationName = null;
        this.searchProfile.directions = null;
      }

/*
    if(this.searchProfile.role === 'Заказчик'){
      this.searchProfile.role = 'Customer';
    }
    if(this.searchProfile.role === 'Ментор'){
      this.searchProfile.role = 'Mentor';
    }
    if(this.searchProfile.role === 'Стажёр'){
      this.searchProfile.role = 'Trainee';
    }*/
    if(!this.searchProfile.isMentorExp){
      this.searchProfile.isMentorExp = null;
    }
    if(this.searchProfile.country === ''){
      this.searchProfile.country = null;
    }
    if(this.searchProfile.city === ''){
      this.searchProfile.city = null;
    }

    this.profileService.searchProfile(this.searchProfile).subscribe( success => {
      this.searchResultProfiles = success;
    });
  }

  ngOnInit() {
  }

}





