import { Component, OnInit, TemplateRef } from '@angular/core';
declare var require: any;
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {ProjectService} from '../../../service/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from '../../../entity/project';
import {CategoryService} from '../../../service/category.service';
import {LanguageService} from '../../../service/language.service';
import {Vacancy} from '../../../entity/vacancy';
import {Skill} from "../../../entity/skill";
import {SkillService} from "../../../service/skill.service";
import {VacancyService} from "../../../service/vacancy.service";
import {Message} from "../../../entity/message";
import {MessageService} from "../../../service/message.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
    public modalRef1: BsModalRef;
    public modalRef2: BsModalRef;
    public modalRef3: BsModalRef;
    public modalRef4: BsModalRef;
    private id;
    private sub: any;
  public customer= false;
  project: Project;
  isDataAvailable = false;
  categories: String[];
  bufferProject: Project;
  languages: String[];
  bufferLanguages: String[];
  projectMentor: boolean;
  vacancy: Vacancy = new Vacancy();
  positions: String[] = [];
  roles: String[] = [];
  skillsSearch: String[] = [];
  skills: Skill[] = [];
  skill: Skill;
  teamTraineeCount= 0;
  teamMentorCount = 0;
  i = 0;
  bufferSkill: String;
  deletedI: number;
  deletedId: number;
  showVacancy: Vacancy;
  approved: String;
  role: String;
  newMessage: Message;
  statuses: String[];
  status: String;

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

  constructor(private modalService: BsModalService, private projectService: ProjectService,
  private activatedRoute: ActivatedRoute, private route: Router, private categoryService: CategoryService,
  private languageService: LanguageService, private skillService: SkillService, private vacancyService: VacancyService,
  private messageService: MessageService) {
    this.roles[0] = 'Mentor';
    this.roles[1] = 'Trainee';
    this.showVacancy = new Vacancy();
    this.approved = localStorage.getItem('approved');
    this.role = localStorage.getItem('role');
    this.newMessage = new Message();
    this.statuses = this.projectService.getStatuses();


  }

    public openModal1(template: TemplateRef<any>) {
      this.bufferProject = new Project(this.project);
      this.categories = this.categoryService.getAllCategories();
        this.modalRef1 = this.modalService.show(template);
    }

    public openModal2(template: TemplateRef<any>) {
      this.bufferProject = new Project(this.project);
      this.languages = this.languageService.getAllLanguages();
      this.bufferLanguages = this.project.languages;
        this.modalRef2 = this.modalService.show(template);
    }

    public openModal3(template: TemplateRef<any>) {

      this.modalRef3 = this.modalService.show(template);
    }

    public openModal4(template: TemplateRef<any>) {
      this.vacancy = new Vacancy();
      this.i = 0;
      this.skills = [];
      this.positions = this.vacancyService.getAllPositions();
      this.languages = this.languageService.getAllLanguages();
      this.skillsSearch = this.skillService.getAllSkills();
      this.bufferLanguages = [];
        this.modalRef3 = this.modalService.show(template);
    }

    public delete(template: TemplateRef<any>) {
        this.modalRef4 = this.modalService.show(template);
    }

  ngOnInit() {

    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id']; // (+) converts string 'id' to a number
      }
      // In a real app: dispatch action to load the details here.
    });

    if (this.id) {
      this.projectService.getProjectById(this.id)
        .subscribe(
          (project) => {
            this.teamMentorCount = 0;
            this.teamTraineeCount = 0;
            console.log(project);
            if (project){
              if (project.customer.id.toString() === localStorage.getItem('uid')){
                this.customer = true;
              }else{
                this.customer = false;
              }
              this.project = project;
              this.isDataAvailable = true;
              console.log(this.project);

              this.project.team.forEach(team => {
                if(team.role === 'Mentor'){
                  this.teamMentorCount++;
                }
                if(team.role === 'Trainee'){
                  this.teamTraineeCount++;
                }
              });

            }else{
              this.route.navigate(['/404']);
            }
          }
        );
    }else{
      this.route.navigate(['/404']);
    }

  }


  toggleMultiSelect(event, val){
    event.preventDefault();
    if (this.bufferLanguages.indexOf(val) === -1){
      this.bufferLanguages = [...this.bufferLanguages, val];
    }else{
      this.bufferLanguages = this.bufferLanguages.filter(function(elem){
        return elem !== val;
      });
    }
  }

  updateProject(status){
    if (status === 0) {
      if (this.bufferProject.projectCategory === '') {
        this.bufferProject.projectCategory = this.categories[0];
      }
      this.modalRef1.hide();
    }else{
      this.bufferProject.languages = this.bufferLanguages;
      this.modalRef2.hide();
    }

    this.projectService.updateProject(this.bufferProject).subscribe( success => {
      this.project = this.bufferProject;
    });
  }

  addVacancy(){
    const bufferSkills: String[] = [];
    let i = 0;
    this.skills.forEach(skill => {
      if (skill){
        bufferSkills[i] = String();
        bufferSkills[i] = skill.name;
        i++;
      }
    });
    if(this.vacancy.role ===''){
      this.vacancy.role = this.roles[0];
    }
    if(this.vacancy.position ===''){
      this.vacancy.position = this.positions[0];
    }

    this.vacancy.skills = bufferSkills;
    this.vacancy.languages = this.bufferLanguages;
    this.vacancyService.addVacancy(this.vacancy, this.project.id).subscribe(success => {
      this.project.vacancies.push(this.vacancy);
    });
  }

  setDeletedI(i){
    this.deletedI = i;
  }

  deleteVacancy(){
    this.vacancyService.deleteVacancy(this.deletedId, this.project.id)
      .subscribe( success => {
        this.project.vacancies[this.deletedI] = null;
      });
  }

  setDeletedId(id){
    this.deletedId = id;
  }

  setShowVacancy(vacancy){
    this.showVacancy = vacancy;
  }

  setStatus(status){
    this.status = status;
  }
  changeProjectStatus(){
    if(this.status !== 'Close'){
      this.project.projectStatus = this.status;
      this.projectService.updateProject(this.project).subscribe();
    }
    if(this.status === 'Close'){
      this.project.projectStatus = this.status;
      this.projectService.closeProject(this.project.id).subscribe();
    }
  }

  requestVacancy(id){
    this.vacancyService.requestVacancy(id).subscribe();
  }

  getConsultation(uid){
    this.projectService.getConsultation(uid, this.project.id).subscribe();

  }


}
