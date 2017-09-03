import { Component, OnInit } from '@angular/core';
import {Project} from "../../../entity/project";
import {ProjectService} from "../../../service/project.service";
declare var require;

@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.css']
})
export class MyprojectsComponent implements OnInit {
    myProjects: Project[];
  isDataAvaliable = false;
  role: String;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjectByUid(+localStorage.getItem('uid')).subscribe(projects => {
      this.isDataAvaliable = true;
      this.role = localStorage.getItem('role');
      this.myProjects = projects;
    });
  }

}
