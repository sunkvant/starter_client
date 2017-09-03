import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../../../service/project.service";
import {SearchProject} from "../../../entity/search-project";
import {CategoryService} from "../../../service/category.service";
import {LanguageService} from "../../../service/language.service";
import {Project} from "../../../entity/project";


@Component({
  selector: 'app-searchproject',
  templateUrl: './searchproject.component.html',
  styleUrls: ['./searchproject.component.css']
})
export class SearchprojectComponent implements OnInit {

  searchProject: SearchProject;
  statuses: String[];
  categories: String[];
  bufferCategories: String[];
  languages: String[];
  bufferLanguages: String[];
  searchResultProjects: Project[];
  anyStatus:boolean;

  constructor(private projectService: ProjectService,private categoryService: CategoryService,
  private languageService: LanguageService) {
    this.searchProject = new SearchProject();
    this.statuses = this.projectService.getStatuses();
    this.categories = this.categoryService.getAllCategories();
    this.bufferCategories = [];
    this.languages = this.languageService.getAllLanguages();
    this.bufferLanguages = [];
    this.anyStatus = false;

  }

  toggleMultiSelect(event, val){
    event.preventDefault();
    if (this.bufferCategories.indexOf(val) === -1){
      this.bufferCategories = [...this.bufferCategories, val];
      //document.getElementById(val).style.setProperty('background-color','red');
      // $('#' + val).toggleClass('fa fa-check');
    }else{
      // document.getElementById(val).style.setProperty('background-color','');
      //$('#' + val).toggleClass('fa fa-check');
      this.bufferCategories = this.bufferCategories.filter(function(elem){
        return elem !== val;
      });
    }
  }
  toggleMultiSelectLanguage(event, val){
    event.preventDefault();
    if (this.bufferLanguages.indexOf(val) === -1){
      this.bufferLanguages = [...this.bufferLanguages, val];
      //document.getElementById(val).style.setProperty('background-color','red');
      // $('#' + val).toggleClass('fa fa-check');
    }else{
      // document.getElementById(val).style.setProperty('background-color','');
      //$('#' + val).toggleClass('fa fa-check');
      this.bufferLanguages = this.bufferLanguages.filter(function(elem){
        return elem !== val;
      });
    }
  }

  search(){
      this.searchProject.languages = this.bufferLanguages;

      this.searchProject.categories = this.bufferCategories;

      if(this.anyStatus){
        this.searchProject.statuses = null;
      }
      this.projectService.searchProject(this.searchProject).subscribe( success => {
        this.searchResultProjects = success;
      });

  }

  ngOnInit() {
  }

}
