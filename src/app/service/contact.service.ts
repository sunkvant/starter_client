import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '../http-client';
import {Contact} from '../entity/contact';


const API_URL = environment.apiUrl;

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  updateContact(contact: Contact){

    return this.http
      .put(API_URL + 'api/profile/', contact)
      .map(response => {
        //console.log(response);
          return response;
        });
  }

}
