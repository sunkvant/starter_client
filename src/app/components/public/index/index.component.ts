import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../../../service/security.service";
import {Router} from "@angular/router";
declare var require: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})



export class IndexComponent implements OnInit{


    //private profile = require('./profile/profile.component.html');
     image1 = require('../../../assets/images/33d87d8.png');
     image2 = require('../../../assets/images/trainee.png');
     image3 = require('../../../assets/images/mentor-2.png');
     image4 = require('../../../assets/images/customer.png');
     logo = require('../../../assets/images/logo4.png');

    constructor( private securityService: SecurityService,private route: Router) {}

  ngOnInit() {
    if (this.securityService.checkSecurityStatus()){
      this.route.navigate(['profile/']);
    }
  }
}
