/**
 * Created by foooox on 28.8.17.
 */
export class Location {
  country: String = '';
  city: String = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
