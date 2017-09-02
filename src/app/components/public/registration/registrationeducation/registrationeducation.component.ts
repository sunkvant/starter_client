import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {Education} from '../../../../entity/education';
import {Course} from '../../../../entity/course';
import {EducationService} from '../../../../service/education.service';
import {CourseService} from '../../../../service/course.service';
import {Router} from '@angular/router';
import {RegistrationService} from '../../../../service/registration.service';

@Component({
  selector: 'app-registrationeducation',
  templateUrl: './registrationeducation.component.html',
  styleUrls: ['./registrationeducation.component.css']
})
export class RegistrationeducationComponent implements OnInit {
    public modalRef: BsModalRef;
    public modalRef1: BsModalRef;
    educationsSearch: Education[] = [];
    educations: Array<Education>;
    education: Education;
    coursesSearch: Course[] = [];
    courses: Array<Course>;
    course: Course;
    i = 0;
    courceI = 0;

  constructor(private modalService: BsModalService, private educationService: EducationService,
              private courseService: CourseService, private route: Router, private registrationService: RegistrationService) {


    this.i = 0;
    this.courceI = 0;
    this.educations = new Array<Education>();
    this.courses = new Array<Course>();

   // console.log(this.registrationService.checkUserStatus());
  }


  educationDelete(id) {
    this.educations[id] = null;
    //console.log(this.educations);
  }

  educationAdd() {
this.education.id = this.i;
    console.log(this.education);
    this.educations.push(this.education);
    this.i++;
    this.modalRef.hide();
  }
  courseDelete(id){
    this.courses[id] = null;
   // console.log(this.courses);
  }

  courseAdd(){
    this.course.id = this.courceI;
   // console.log(this.course);
    this.courses.push(this.course);
    this.courceI++;
    this.modalRef1.hide();
  }

    public openModal1(template: TemplateRef<any>) {

      this.educationsSearch = this.educationService.getAllEducations();
      this.education = new Education();
      this.education.educationType = 'Очная';
        this.modalRef = this.modalService.show(template);
    }

    public openModal2(template1: TemplateRef<any>) {
    this.coursesSearch = this.courseService.getAllCourses();
      this.course = new Course();
        this.modalRef1 = this.modalService.show(template1);
    }

    nextStep(){
      localStorage.setItem('step', 'education');
      const bufferEducations: Education[] = [];
      let i = 0;
      this.educations.forEach(education => {
        if (education){
          bufferEducations[i] = new Education();
          bufferEducations[i].name = education.name;
          bufferEducations[i].speciality = education.speciality;
          bufferEducations[i].educationType = education.educationType;
          if(education.graduationYear) {
            bufferEducations[i].graduationYear = education.graduationYear;
          }else{
            bufferEducations[i].graduationYear = 0;
          }
          bufferEducations[i].faculty = education.faculty;
          i++;
        }
      });
      i=0;
      const bufferCourses: Course[] = [];
      this.courses.forEach(course => {
        if (course){
          bufferCourses[i] = new Course();
          if(course.graduationYear) {
            bufferCourses[i].graduationYear = course.graduationYear;
          }else{
            bufferCourses[i].graduationYear = 0;
          }
          bufferCourses[i].speciality = course.speciality;
          bufferCourses[i].name = course.name;
          bufferCourses[i].organization = course.organization;
          i++;
        }
      });

      this.registrationService.setEducations(bufferEducations);
      this.registrationService.setCourses(bufferCourses);


      this.route.navigate(['register/work']);
    }

  ngOnInit() {
      if ((localStorage.getItem('step') !== 'profile')|| (!this.registrationService.getRole())){
        localStorage.removeItem('step');
        this.route.navigate(['/register']);
      }
  }

}
