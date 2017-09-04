import {Component, LOCALE_ID, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from '../../../../entity/profile';
import {HttpClient} from '../../../../http-client';
import {ProfileService} from '../../../../service/profile.service';
declare var require: any;
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {CountryService} from '../../../../service/country.service';
import {CityService} from '../../../../service/city.service';
import {Course} from '../../../../entity/course';
import {CourseService} from '../../../../service/course.service';
import {ContactService} from '../../../../service/contact.service';
import {Contact} from '../../../../entity/contact';
import {Location} from "../../../../entity/location";
import {Message} from "../../../../entity/message";
import {MessageService} from "../../../../service/message.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: number;
  sub: any;
  private image = require('./01.jpg');
    public items: string[] = ['Профиль',
        'Настройки', 'Создать проект', 'Выйти'];
chek = false;
  profile: Profile = new Profile();
  public isDataAvailable = false;
  public modalRef: BsModalRef;
  public modalRef3: BsModalRef;
  public modalRef5: BsModalRef;
  public customer= false;
  course: Course;
  cities: String[] = [];
  coursesSearch: Course[] = [];
  countries: String[] = [];
  contact: Contact = new Contact();
  bufferCourse: Course;
  deletedId: number;
  addStatus = false;
  deletedI = -1;
  private files: any;
  newMessage: Message;
  role: String;
  approved: boolean;


  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService,
              private modalService: BsModalService, private countryService: CountryService,
              private cityService: CityService, private courseService: CourseService,
              private contactService: ContactService, private route: Router,
  private messageService: MessageService) {

    this.newMessage = new Message();
    this.role = localStorage.getItem('role');
    if(localStorage.getItem('approved') === 'false'){
      this.approved = false;
    }


  }

  setAddStatus(status){
    this.addStatus = status;
  }

  public openModal1(template: TemplateRef<any>) {

    this.countries = this.countryService.getAllCountries();
    this.contact = new Contact(this.profile.contact);
    this.contact.location = new  Location(this.profile.contact.location);
    this.setCities();
    this.modalRef = this.modalService.show(template);
  }

  public openModal3(template: TemplateRef<any>, course: Course) {
    this.course = new Course();
    if (!this.addStatus){
      this.course = new Course(course);
    }

    this.bufferCourse = course;
    this.coursesSearch = this.courseService.getAllCourses();
    this.modalRef3 = this.modalService.show(template);
  }

  public openModal5(template: TemplateRef<any>) {

    this.contact = new Contact(this.profile.contact);
    this.modalRef5 = this.modalService.show(template);
  }

  setCities(){
    this.cities = this.cityService.getAllCitiesByCountry(this.contact.location.country);
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id']; // (+) converts string 'id' to a number
      }
      // In a real app: dispatch action to load the details here.
    });

    if (this.id) {
      this.profileService.getProfileById(this.id)
        .subscribe(
          (profile) => {
            if (profile){
              this.customer = false;
              this.profile = profile;
              this.isDataAvailable = true;
              console.log(this.profile);
              if ( localStorage.getItem('uid') === this.profile.id.toString()){
                this.customer = true;
              }else{
                this.customer = false;
              }
            }else{
              this.route.navigate(['/404']);
            }
          }
        );
    } else {
      this.profileService.getProfile()
        .subscribe(
          (profile) => {
            if (profile) {
              this.customer = true;
              this.profile = profile;
              //console.log(this.profile);
              this.isDataAvailable = true;
            }else{
              this.route.navigate(['/404']);
            }
          });
    }
  }


  updateContact(status){
    this.contactService.updateContact(this.contact)
      .subscribe( success => {
        this.profile.contact = this.contact;
        if (status === 0){
          this.modalRef.hide();
          document.location.href = '/profile';
        }else {
          this.modalRef5.hide();
        }
      });
  }

  updateCourse(i){
    if (!this.course.graduationYear){
      this.course.graduationYear = 0;
    }
    if (this.addStatus){
      this.courseService.addCourse(this.course)
        .subscribe( success => {
          this.profile.courses.push(this.course);
          this.modalRef3.hide();
          document.location.href = '/profile';
        });
    }else{
    this.courseService.updateCourse(this.course)
      .subscribe( success => {
        this.profile.courses[i] = new Course(this.course);
        this.modalRef3.hide();
      });
    }
  }

  setDeletedId(id){
    this.deletedId = id;
  }

  setDeletedI(i){
    this.deletedI = i;
  }

  deleteCourse(){
    this.courseService.deleteCourse(this.deletedId).subscribe( success => {
      this.profile.courses[this.deletedI] = null;

    });
  }

  addPhoto(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
    if (this.files) {
      const files: FileList = this.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++){
        formData.append('file', files[i]);
      }
      this.profileService.updateAvatar(formData);
    }
  }

  createNewMessage(){
    this.newMessage = new Message();
  }

  sendMessage(){
    this.newMessage.receiverId = this.profile.id;
    this.messageService.sendMessage(this.newMessage).subscribe();
  }

  getAccessment(){
    this.profileService.getAccessment(this.profile.id).subscribe(() => {

    });
  }

}
