/**
 * Created by foooox on 2.9.17.
 */
export class Project {
  id: number;
  name: String = '';
  description: String = '';
  contactInfo: String = '';
  projectCategory: String = '';
  languages: String[] = [];
  dateStart: number;
  dateEnd: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
