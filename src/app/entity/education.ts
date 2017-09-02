export class Education {
  id: number;
  name: String = '';
  faculty: String = '';
  speciality: String = '';
  graduationYear :0;
  educationType: String = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
