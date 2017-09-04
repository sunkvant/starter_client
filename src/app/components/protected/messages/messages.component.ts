import { Component, OnInit } from '@angular/core';
import {Message} from "../../../entity/message";
import {Profile} from "../../../entity/profile";
import {MessageService} from "../../../service/message.service";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  showMessage: Message;
  newMessage: Message;

  constructor(private messageService: MessageService) {
    this.messages = [];

    this.showMessage = new Message();
    this.showMessage.senderPerson =  new Profile();
    this.showMessage.receiverPerson = new Profile();

    this.newMessage = new Message();
    this.newMessage.senderPerson = new Profile();
  }

  ngOnInit() {
    this.getAllMessages();

  }

  getAllMessages(){
    this.messageService.getAllMassages().subscribe( messages => {
      this.messages = messages;
    });

  }
  getReceivedMessages(){

  }
  getSentMessages(){

  }
  setShowMessage(message){
    this.showMessage = message;
    this.showMessage.receiverPerson = message.receiverPerson;
    if(this.showMessage.senderPerson.id !== +localStorage.getItem('uid')){
      this.messageService.setRead(this.showMessage.id).subscribe();
      const readId = this.messages.indexOf(message);
      this.messages[readId].read = true;
    }
  }

  sendMessage(){
    this.newMessage.receiverId = this.showMessage.senderPerson.id;
    this.messageService.sendMessage(this.newMessage).subscribe();
  }

  writeMessage(){
    this.newMessage = new Message();
  }

}
