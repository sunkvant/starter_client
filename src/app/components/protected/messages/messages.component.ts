import { Component, OnInit } from '@angular/core';
declare var require;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
    private image = require("../profile/01.jpg");

  constructor() { }

  ngOnInit() {
  }

}
