import { Component, OnInit } from '@angular/core';
declare var require;

@Component({
  selector: 'app-searchvacantion',
  templateUrl: './searchvacantion.component.html',
  styleUrls: ['./searchvacantion.component.css']
})
export class SearchvacantionComponent implements OnInit {
    private role = "Стажёр";
    private position = "Программист";
    private image = require("../profile/01.jpg");
    public items: string[] = ['Профиль',
        'Настройки', 'Создать проект','Выйти'];
  constructor() { }

  ngOnInit() {
  }

}
