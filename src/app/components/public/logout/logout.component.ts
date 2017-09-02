import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private tokenService: TokenService) {

  }

  ngOnInit() {

    this.tokenService.logout();
  }

}
