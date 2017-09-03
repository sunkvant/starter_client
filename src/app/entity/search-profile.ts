/**
 * Created by foooox on 3.9.17.
 */
export class SearchProfile {
  role: String;
  fullName: String;
  ageFrom: number;
  ageTo: number;
  skills: String[];
  country: String;
  city: String;
  directions: String[];
  educationName: String;
  isMentorExp: boolean;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
