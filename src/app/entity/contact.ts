/**
 * Created by foooox on 28.8.17.
 */

import {Location} from './location';
export class Contact {
  fullName: String;
  dateOfBirth = 0;
  avatarPath: String = '';
  phone: String = '';
  skype: String = '';
  email: String = '';
  about: String = '';
  location: Location = new Location();

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
