import {Profile} from "./profile";
/**
 * Created by foooox on 2.9.17.
 */
export class TeamPerson {
  id: number;
  position: String ;
  role: String ;
  active: boolean;
  profile: Profile;



  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
