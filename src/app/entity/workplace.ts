import {Timestamp} from 'rxjs/Rx';
export class Workplace {
  id: number;
  company: String = '';
  sphereOfActivity: String = '';
  position: String = '';
  duties: String = '';
  startWork = 0;
  endWork = 0;
  working = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
