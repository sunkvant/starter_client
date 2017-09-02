import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {Education} from "../../../../entity/education";
import {EducationService} from "../../../../service/education.service";
import {ProfileService} from "../../../../service/profile.service";
import {isUndefined} from "util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
    public modalRef2: BsModalRef;
  educationsSearch: Education[] = [];
  educations: Education[];
  education: Education;
  customer: boolean;
  bufferEducation: Education;
  deletedId: number;
  addStatus = false;
  deletedI = -1;

  constructor(private modalService: BsModalService, private educationService: EducationService,
              private profileService: ProfileService) {

    this.educations = this.profileService.profile.educations;



    if(this.profileService.profile.id.toString() === localStorage.getItem('uid')){
      this.customer = true;
    }else {
      this.customer = false;
    }

  }

  setAddStatus(status){
    this.addStatus = status;
  }

    public openModal2(template: TemplateRef<any>, education: Education) {
    this.education = new Education();
    if(this.addStatus){
      this.education.educationType = 'Очная';
    }else{
      this.education = new Education(education);
    }

    this.bufferEducation = education;
      this.educationsSearch = this.educationService.getAllEducations();
        this.modalRef2 = this.modalService.show(template);
    }
  ngOnInit() {

    console.log(this.educations);
  }

  updateEducation(i){
    if(!this.education.graduationYear){
      this.education.graduationYear = 0;
    }
    if(this.addStatus){
      this.educationService.addEducation(this.education).subscribe(success => {
        this.educations.push(new Education(this.education)) ;
        this.modalRef2.hide();
        //this.route.navigate(['/profile']);
        document.location.href = '/profile';
      });

    }else{
      this.educationService.updateEducation(this.education)
        .subscribe( success => {
          this.educations[i] = new Education(this.education);
          this.modalRef2.hide();
        });

    }


  }

  setDeletedI(i){
    this.deletedI = i;
  }

  deleteEducation(){
    this.educationService.deleteEducation(this.deletedId)
      .subscribe( success => {
        this.educations[this.deletedI] = null;
      });

  }

  setDeletedId(id){
    this.deletedId = id;
  }

}
