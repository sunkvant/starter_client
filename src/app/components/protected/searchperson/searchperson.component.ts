import { Component, OnInit } from '@angular/core';
declare var require;

@Component({
  selector: 'app-searchperson',
  templateUrl: './searchperson.component.html',
  styleUrls: ['./searchperson.component.css']
})
export class SearchpersonComponent implements OnInit {
    private role = "Стажёр";
    private item = "Программист";
    private image = require("../profile/01.jpg");
    public items: string[] = ['Профиль',
        'Настройки', 'Создать проект','Выйти'];
  constructor() { }


  ngOnInit() {
  }

}





