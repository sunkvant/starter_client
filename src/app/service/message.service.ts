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

  getAllMassages() {
    return this.http
      .get(API_URL + 'api/messages/getAll')
      .map(response => {
           return response.json();
      });
  }

  getReceivedMessages() {
    return this.http
      .get(API_URL + 'api/messages/getReceived')
      .map(response => {
        return response.json();
      });
  }

  getSentMessages() {
    return this.http
      .get(API_URL + '/api/messages/getSent')
      .map(response => {
        return response.json();
      });
  }

  setRead(id) {
    return this.http
      .post(API_URL + 'api/message/setRead/' + id, null)
      .map(response => {

      });
  }

  deleteMessage(id) {
    return this.http
      .delete(API_URL + 'api/message/'+id)
      .map(response => {

      });
  }

}
