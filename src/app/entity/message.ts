import {Profile} from "./profile";
import {Project} from "./project";
import {Vacancy} from "./vacancy";
/**
 * Created by foooox on 3.9.17.
 */
export class Message {
  id: number;
  isRead: boolean;
  date: number;
  requestType: String;
  senderPerson: Profile;
  receiverPerson: Profile;
  title: String;
  isSingle: boolean;
  projectDTO: Project;
  text: String;
  isAnswered: boolean;
  vacancyDTO: Vacancy;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
