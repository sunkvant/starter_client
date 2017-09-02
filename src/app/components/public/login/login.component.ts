import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {RegistrationService} from '../../../service/registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from '../../../service/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private sub: any;
  public loginError=false;

  constructor(private tokenService: TokenService, private registrationService: RegistrationService,
              private route: Router, private activatedRoute: ActivatedRoute,
              private securityService: SecurityService) { }

  ngOnInit() {
    this.loginError = false;
    if (this.securityService.checkSecurityStatus()){
      this.route.navigate(['profile/']);
    }
  }

  loginFB(){
    this.registrationService.getFBInfo();
  }

  loginVK(){
    this.registrationService.loginVK();
  }


  login(username, password) {

    this.tokenService.getToken(username, password).subscribe(success =>{
        this.loginError = false;
    },
    error => {
      this.loginError = true;
    });

  }
  register(){
    this.route.navigate(['/register']);
  }

}
