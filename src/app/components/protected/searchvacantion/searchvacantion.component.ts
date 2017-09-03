import { Component, OnInit } from '@angular/core';
import {VacancyService} from "../../../service/vacancy.service";
import {SearchVacancy} from "../../../entity/search-vacancy";
import {LanguageService} from "../../../service/language.service";
import {SkillService} from "../../../service/skill.service";
import {Vacancy} from "../../../entity/vacancy";
import {ProjectService} from "../../../service/project.service";


@Component({
  selector: 'app-searchvacantion',
  templateUrl: './searchvacantion.component.html',
  styleUrls: ['./searchvacantion.component.css']
})
export class SearchvacantionComponent implements OnInit {

  searchVacancy: SearchVacancy;
  positions: String[];
  bufferPositions: String[];
  roles: String[] =[];
  anyRole: boolean;
  languages: String[];
  bufferLanguages: String[];
  skills: String[];
  bufferSkills: String[];
  searchResultVacancies: Vacancy[];


  constructor(private vacancyService: VacancyService, private languageService: LanguageService,
              private skillService: SkillService, private projectService: ProjectService) {
    this.searchVacancy = new SearchVacancy();
    this.positions = this.vacancyService.getAllPositions();
    this.bufferPositions = [];
    this.roles[0] = 'Mentor';
    this.roles[1] = 'Trainee';
    this.languages = this.languageService.getAllLanguages();
    this.bufferLanguages = [];
    this.bufferSkills = [];
    this.skills = this.skillService.getAllSkills();

    this.anyRole = false;

  }

  search(){
    this.searchVacancy.languages = this.bufferLanguages;
    this.searchVacancy.positions = this.bufferPositions;
    this.searchVacancy.skills = this.bufferSkills;

    if(this.anyRole){
      console.log(this.searchVacancy);
      this.searchVacancy.role = null;
    }
    this.vacancyService.searchVacancy(this.searchVacancy).subscribe( success => {
      this.searchResultVacancies = success;

    });


  }
  ngOnInit() {
    this.search();
  }


  toggleMultiSelect(event, val){
    event.preventDefault();
    if (this.bufferPositions.indexOf(val) === -1){
      this.bufferPositions = [...this.bufferPositions, val];
    }else{
      this.bufferPositions = this.bufferPositions.filter(function(elem){
        return elem !== val;
      });
    }
  }

  toggleMultiSelectLanguage(event, val){
    event.preventDefault();
    if (this.bufferLanguages.indexOf(val) === -1){
      this.bufferLanguages = [...this.bufferLanguages, val];
    }else{
      this.bufferLanguages = this.bufferLanguages.filter(function(elem){
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

}
