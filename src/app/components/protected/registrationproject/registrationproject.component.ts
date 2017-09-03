import { Component, OnInit } from '@angular/core';
import { Project } from '../../../entity/project';
import {$} from "protractor/built";
import {CategoryService} from "../../../service/category.service";
import {LanguageService} from "../../../service/language.service";
import {ProjectService} from "../../../service/project.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registrationproject',
  templateUrl: './registrationproject.component.html',
  styleUrls: ['./registrationproject.component.css']
})
export class RegistrationprojectComponent implements OnInit {

  project: Project;

  public langs: any[]= [];
  public selectedLangues: any[]= [];
  categories: String[] = [];

  constructor(private categoryService: CategoryService, private languageService: LanguageService,
  private  projectService: ProjectService, private route: Router) {
    this.langs = this.languageService.getAllLanguages();
    this.project = new Project();
    this.categories = this.categoryService.getAllCategories();

  }

  toggleMultiSelect(event, val){
    event.preventDefault();
    if (this.selectedLangues.indexOf(val) === -1){
      this.selectedLangues = [...this.selectedLangues, val];
      document.getElementById(val).style.setProperty('background-color','red');
     // $('#' + val).toggleClass('fa fa-check');
    }else{

      document.getElementById(val).style.setProperty('background-color','');
     //$('#' + val).toggleClass('fa fa-check');
      this.selectedLangues = this.selectedLangues.filter(function(elem){
        return elem !== val;
      });
    }
  }

  addProject(){
    if(this.project.projectCategory===''){
      this.project.projectCategory = this.categories[0];
    }
    this.project.languages = this.selectedLangues;
    this.projectService.addProject(this.project).subscribe( success => {
      this.route.navigate(['projects/']);
    });

  }

  ngOnInit() {


  }

}
