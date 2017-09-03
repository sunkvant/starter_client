/**
 * Created by foooox on 3.9.17.
 */
export class SearchVacancy {
  role: String;
  positions: String[];
  skills: String[];
  languages: String[];


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
