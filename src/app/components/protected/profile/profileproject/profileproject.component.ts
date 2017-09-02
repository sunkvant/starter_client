import { Component, OnInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'app-profileproject',
  templateUrl: './profileproject.component.html',
  styleUrls: ['./profileproject.component.css']
})
export class ProfileprojectComponent implements OnInit {
    private image = require("../profile/01.jpg");
  constructor() { }

  ngOnInit() {
  }

}
