import {Profile} from "./profile";
import {Review} from "./review";
import {Vacancy} from "./vacancy";
import {TeamPerson} from "./team-person";
/**
 * Created by foooox on 2.9.17.
 */
export class Project {
  id: number;
  name: String = '';
  description: String = '';
  contactInfo: String = '';
  projectCategory: String = '';
  projectStatus: String;
  languages: String[] = [];
  dateStart: number;
  dateEnd: number;
  customer: Profile;
  reviews: Review[];
  vacancies: Vacancy[];
  team: TeamPerson[];


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
