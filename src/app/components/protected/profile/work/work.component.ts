import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {Workplace} from '../../../../entity/workplace';
import {ProfileService} from '../../../../service/profile.service';
import {WorkplaceService} from "../../../../service/workplace.service";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
    public modalRef4: BsModalRef;
  workplacesSearch: Workplace[] = [];
  workplaces:  Workplace[] = [];
  workplace: Workplace;
  customer: boolean;
  bufferWorkplace: Workplace;
  deletedId: number;
  addStatus = false;
  deletedI = -1;

  constructor(private modalService: BsModalService, private profileService: ProfileService,
  private workplaceService: WorkplaceService) {

    this.workplaces = profileService.profile.workplaces;
    //console.log(this.workplaces);

    if (this.profileService.profile.id.toString() === localStorage.getItem('uid')){
      this.customer = true;
    }else {
      this.customer = false;
    }

  }


  setAddStatus(status){
    this.addStatus = status;
  }

  public openModal4(template: TemplateRef<any>, workplace: Workplace) {
    this.workplace = new Workplace();
    if(!this.addStatus) {
      this.workplace = new Workplace(workplace);
    }
    this.bufferWorkplace = workplace;
    this.workplacesSearch = this.workplaceService.getAllWorkplaces();
        this.modalRef4 = this.modalService.show(template);
    }

  ngOnInit() {
  }

  updateWorkplace(i){

    if(this.addStatus){
      this.workplaceService.addWorkplace(this.workplace)
        .subscribe( success => {
          this.workplaces.push(this.workplace);
          this.modalRef4.hide();
          document.location.href = '/profile';
        });
    }else{
      this.workplaceService.updateWorkplace(this.workplace)
        .subscribe( success => {
          this.workplaces[i] = new Workplace(this.workplace);
          this.modalRef4.hide();
        });
    }
  }


  setDeletedI(i){
    this.deletedI = i;
  }

  deleteWorkplace(){
    this.workplaceService.deleteWorkplace(this.deletedId)
      .subscribe( success => {
        this.workplaces[this.deletedI] = null;

      });

  }

  setDeletedId(id){
    this.deletedId = id;
  }

}
