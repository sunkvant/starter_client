import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '../http-client';

const API_URL = environment.apiUrl;

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(message) {
    return this.http
      .post(API_URL + 'api/message/messageRequest', message)
      .map(response => {

      });

  }

}
