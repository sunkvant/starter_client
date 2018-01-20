/**
 * Created by foooox on 2.9.17.
 */
export class Vacancy {
  id: number;
  role: String = '';
  position: String = '';
  skills: String[] = [];
  languages: String[] = [];
  projectId: number;
  personNumber: number;
  active: boolean;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
