import { Component, OnInit } from '@angular/core';
import {Skill} from '../../../../entity/skill';
import {Direction} from '../../../../entity/direction';
import {DirectionService} from '../../../../service/direction.service';
import {SkillService} from '../../../../service/skill.service';
import {Profile} from '../../../../entity/profile';
import {RegistrationService} from '../../../../service/registration.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registrationskill',
  templateUrl: './registrationskill.component.html',
  styleUrls: ['./registrationskill.component.css']
})
export class RegistrationskillComponent implements OnInit {


  skillsSearch: String[] = [];
  skills: Array<Skill>;
  skill: Skill;
  direction: String;
  role: String;
  directionsSearch: String[] = [];
  i = 0;
  bufferSkill: String;
  user: Profile = new Profile();

  skillAdd(){

    this.skill = new Skill();
    this.skill.id = this.i;
    this.skill.name = this.bufferSkill;
    this.bufferSkill = '';
    //console.log(this.skill);
    this.skills.push(this.skill);
    this.i++;
  }

  skillDelete(id){
    this.skills[id] = null;
    console.log(this.skills);

  }

  constructor(private directionService: DirectionService, private skillService: SkillService,
              private registrationService: RegistrationService, private route: Router) {
  this.role = this.registrationService.getRole();
  console.log(this.registrationService.checkUserStatus());
    this.i = 0;
    this.skills = new Array<Skill>();
    this.skillsSearch = this.skillService.getAllSkills();
    console.log(this.skillsSearch);
    this.directionsSearch = this.directionService.getAllDirections();


  }

  nextStep(){
    localStorage.removeItem('step');
    const bufferSkills: String[] = [];
    let i = 0;
    this.skills.forEach(skill => {
      if (skill){
        bufferSkills[i] = String();
        bufferSkills[i] = skill.name;
        i++;
      }
    });
    this.registrationService.setSkills(bufferSkills);
    this.registrationService.setDirection(this.direction);
    this.registrationService.setMentorExp(this.user.mentorExp, this.user.experience);
     this.registrationService.registration();

  }

  ngOnInit( ) {
    console.log(this.skillsSearch);
     if ((localStorage.getItem('step') !== 'work') && (localStorage.getItem('step') !== 'social') || (!this.registrationService.getRole())){
     localStorage.removeItem('step');
     this.route.navigate(['/register']);
     }

  }

}
