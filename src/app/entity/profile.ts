import {Timestamp} from 'rxjs/Rx';
import {Direction} from './direction';
import {Course} from './course';
import {Workplace} from './workplace';
import {Education} from './education';
import {Skill} from './skill';
import {Location} from './location';
import {Contact} from "./contact";
export class Profile {
  id: number;
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
  mentorExp = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
