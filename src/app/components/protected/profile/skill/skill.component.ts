import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {Skill} from '../../../../entity/skill';
import {ProfileService} from '../../../../service/profile.service';
import {SkillService} from '../../../../service/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
    public modalRef6: BsModalRef;
  skillsSearch: String[] = [];
  skills: Skill[] = [];
  realSkills: String[]= [];
  skill: Skill;
  i = 0;
  bufferSkill: String;
  customer: boolean;

  skillAdd(name){

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

  constructor(private modalService: BsModalService, private profileService: ProfileService,
  private skillService: SkillService) {

    this.i = 0;
    this.realSkills = this.profileService.profile.skills;
    if(this.profileService.profile.id.toString() === localStorage.getItem('uid')){
      this.customer = true;
    }else {
      this.customer = false;
    }


  }

    public openModal6(template: TemplateRef<any>) {
      let i = 0;
      this.skills = [];
      this.realSkills.forEach(skill => {
        this.skills[i] = new Skill();
        this.skills[i].id = i;
        this.skills[i].name = skill;
        i++;
      });
      //console.log(this.skills);
      this.skillsSearch = this.skillService.getAllSkills();
        this.modalRef6 = this.modalService.show(template);
    }

  ngOnInit() {
  }

  updateSkill(){
    const bufferSkills: String[] = [];
    let i = 0;
    this.skills.forEach(skill => {
      if (skill){
        bufferSkills[i] = String();
        bufferSkills[i] = skill.name;
        i++;
      }
    });

    this.skillService.updateSkills(bufferSkills).subscribe( success => {
      this.realSkills = bufferSkills;
      this.modalRef6.hide();
    });
  }

}
