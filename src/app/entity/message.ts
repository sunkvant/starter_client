/**
 * Created by foooox on 3.9.17.
 */
export class Message {
 /* id: number;
  login: String;
  password: String;
  contact: Contact = new Contact();
  role: String = '';
  direction: String = '';
  courses: Course[] = [];
  workplaces: Workplace[] = [];
  educations: Education[] = [];
  skills: String[] = [];
  experience: String = '';
  blocked: boolean;
  approved: boolean;
  mentorExp = false;*/

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
