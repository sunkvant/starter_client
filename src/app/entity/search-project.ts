/**
 * Created by foooox on 3.9.17.
 */
export class SearchProject {
  name: String;
  categories: String[];
  statuses: String;
  languages: String[];


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
