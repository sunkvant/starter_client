export class Course {
  id: number;
  name: String = '';
  organization: String = '';
  speciality: String = '';
  graduationYear :0;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
