import { Component, OnInit, TemplateRef } from '@angular/core';
declare var require: any;
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
    private role = "Стажёр";
    private language = "Английский";
    private item = "Русский";
    private image = require("./01.jpg");
    public items: string[] = ['Профиль',
        'Настройки', 'Создать проект','Выйти'];
    public modalRef1: BsModalRef;
    public modalRef2: BsModalRef;
    public modalRef3: BsModalRef;
    public modalRef4: BsModalRef;

  constructor(private modalService: BsModalService) { }

    public openModal1(template: TemplateRef<any>) {
        this.modalRef1 = this.modalService.show(template);
    }

    public openModal2(template: TemplateRef<any>) {
        this.modalRef2 = this.modalService.show(template);
    }

    public openModal3(template: TemplateRef<any>) {
        this.modalRef3 = this.modalService.show(template);
    }

    public openModal4(template: TemplateRef<any>) {
        this.modalRef3 = this.modalService.show(template);
    }

    public delete(template: TemplateRef<any>) {
        this.modalRef4 = this.modalService.show(template);
    }

  ngOnInit() {
  }

}
