
/**
 * Created by foooox on 2.9.17.
 */
export class Review {
  id: number;
  rating = 0;
  text: String = '';
  receiverPersonId;
  projectId = 0;


  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
