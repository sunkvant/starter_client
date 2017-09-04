import {Component, NgModule, OnInit} from '@angular/core';
import {ProfileService} from './service/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from './http-client';
import {environment} from '../environments/environment';
import {Profile} from './entity/profile';
import {SecurityService} from './service/security.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
 public showHead: boolean;
  public profiles: Profile[] = [];
  myProfile: Profile;
  title = 'app';
  public uid: any;
  isDataAvalible = false;

constructor(private http: HttpClient, private route: Router, private securityService: SecurityService,
            private activatedRoute: ActivatedRoute, private profileService: ProfileService) {}

toProfile(id){
  this.route.navigate(['/profile/' + id]);
}

search(value) {
  const API_URL = environment.apiUrl;
  return this.http
    .get(API_URL + 'api/profile/search?fullName=' + value)
    .subscribe(response => {
      let i = 0;
      response.json().forEach(profile => {
        this.profiles[i] = new Profile();
        this.profiles[i] = profile;
        i++;
      });
     console.log(this.profiles);
      return null;
    });

}


  ngOnInit() {
    this.showHead = this.securityService.checkSecurityStatus();
    if(this.showHead) {
      this.profileService.getProfile().subscribe(profile => {
        this.myProfile = profile;
        this.isDataAvalible = true;
        localStorage.setItem('uid', this.myProfile.id.toString());
        localStorage.setItem('role', this.myProfile.role.toString());
        if(this.myProfile.role !== 'Customer'){
          localStorage.setItem('approved', this.myProfile.approved.toString());
        }

      });
    }else{
      this.isDataAvalible = true;
    }
  }

}
