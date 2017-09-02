import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class SecurityService {

  private showHead=  false;

  constructor(private route: Router) { }

  checkSecurityStatus(){
    if(localStorage.getItem('access_token')){
      this.showHead = true;
    }else{
      this.showHead = false;
    }
    return this.showHead;
  }

}
