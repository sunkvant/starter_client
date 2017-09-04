import { Component, OnInit } from '@angular/core';
import {Message} from "../../../entity/message";
import {Profile} from "../../../entity/profile";
import {MessageService} from "../../../service/message.service";
import {ProfileService} from "../../../service/profile.service";
import {VacancyService} from "../../../service/vacancy.service";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  showMessage: Message;
  newMessage: Message;
  uid: number;
  deletedMessage: Message;

  constructor(private messageService: MessageService, private profileService: ProfileService, private vacancyService: VacancyService) {
    this.messages = [];
    this.uid = +localStorage.getItem('uid');

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
    this.messageService.getReceivedMessages().subscribe( messages => {
      this.messages = messages;
    });
  }
  getSentMessages(){
    this.messageService.getSentMessages().subscribe( messages => {
      this.messages = messages;
    });
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
    this.newMessage.title = '(Re)' + this.showMessage.title;
  }

  setDeletedMessage(message){
    this.deletedMessage = message;
  }

  deleteMessage(){
    this.messageService.deleteMessage(this.deletedMessage.id).subscribe(()=>{
      const i = this.messages.indexOf(this.deletedMessage);
      this.messages[i].id = -1;
    });
  }

  setAssessment(uid){
    this.profileService.setAssessment(uid).subscribe();

  }

  setUserOnVacancy(uid){
    this.vacancyService.setUserOnVacancy(uid, this.showMessage.vacancyDTO.id).subscribe();
  }

}
