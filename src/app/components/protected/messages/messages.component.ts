import { Component, OnInit } from '@angular/core';
import {Message} from "../../../entity/message";
import {Profile} from "../../../entity/profile";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  showMessage: Message;
  newMessage: Message;

  constructor() {
    this.messages = [];
    this.showMessage = new Message();
    this.showMessage.senderPerson =  new Profile();
    this.newMessage = new Message();
    this.newMessage.senderPerson = new Profile();
  }

  ngOnInit() {
  }

  getAllMessages(){

  }
  getReceivedMessages(){

  }
  getSentMessages(){

  }
  setShowMessage(message){
    this.showMessage = message;

  }
  writeMessage(){
    this.newMessage = new Message();
  }

}
