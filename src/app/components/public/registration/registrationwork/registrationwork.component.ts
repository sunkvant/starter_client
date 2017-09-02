import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {Workplace} from '../../../../entity/workplace';
import {Router} from '@angular/router';
import {WorkplaceService} from "../../../../service/workplace.service";
import {RegistrationService} from "../../../../service/registration.service";

@Component({
  selector: 'app-registrationwork',
  templateUrl: './registrationwork.component.html',
  styleUrls: ['./registrationwork.component.css']
})
export class RegistrationworkComponent implements OnInit {

    workplacesSearch: Workplace[] = [];
    workplaces: Array<Workplace>;
    workplace: Workplace;
    i= 0;


    public modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private route: Router,
              private workplaceService: WorkplaceService, private registrationService: RegistrationService) {

    //console.log(this.registrationService.checkUserStatus());
    this.i = 0;
    this.workplaces = new Array<Workplace>();
  }


    public openModal1(template: TemplateRef<any>) {
    this.workplacesSearch = this.workplaceService.getAllWorkplaces();
    this.workplace = new Workplace();
        this.modalRef = this.modalService.show(template);
    }

    workplaceDelete(id){
      this.workplaces[id] = null;
      console.log(this.workplaces);

    }

    workplaceAdd(){
      this.workplace.id = this.i;
      console.log(this.workplace);
      this.workplaces.push(this.workplace);
      this.i++;
      this.modalRef.hide();

    }

    nextStep(){

      localStorage.setItem('step', 'work');
      const bufferWorkplaces: Workplace[] = [];
      let i = 0;
      this.workplaces.forEach(workplace => {
        if (workplace){
          bufferWorkplaces[i] = new Workplace();
          bufferWorkplaces[i].company = workplace.company;
          bufferWorkplaces[i].working = workplace.working;
          bufferWorkplaces[i].position = workplace.position;
          bufferWorkplaces[i].endWork = workplace.endWork;
          bufferWorkplaces[i].duties = workplace.duties;
          bufferWorkplaces[i].sphereOfActivity = workplace.sphereOfActivity;
          bufferWorkplaces[i].startWork = workplace.startWork;
          i++;
        }
      });
      this.registrationService.setWorkplaces(bufferWorkplaces);

      this.route.navigate(['register/skill']);
    }
  ngOnInit() {

     if ((localStorage.getItem('step') !== 'education')|| (!this.registrationService.getRole())){
     localStorage.removeItem('step');
     this.route.navigate(['/register']);
     }
  }

}
