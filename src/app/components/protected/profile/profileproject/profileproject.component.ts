import { Component, OnInit } from '@angular/core';
import {Project} from '../../../../entity/project';
import {ProjectService} from '../../../../service/project.service';
import {ProfileService} from "../../../../service/profile.service";
import {Profile} from "../../../../entity/profile";

@Component({
  selector: 'app-profileproject',
  templateUrl: './profileproject.component.html',
  styleUrls: ['./profileproject.component.css']
})
export class ProfileprojectComponent implements OnInit {
  projects: Project[];
  profile: Profile = new Profile();
  constructor(private projectService: ProjectService, private profileService: ProfileService) {
    this.projectService.getProjectByUid(this.profileService.profile.id).subscribe(succsess => {this.projects = succsess; });
  }

  ngOnInit() {
  }

}
