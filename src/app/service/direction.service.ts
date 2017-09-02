import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "../http-client";
import {Direction} from "../entity/direction";

const API_URL = environment.apiUrl;

@Injectable()
export class DirectionService {


  directions: String[] = [];

  constructor(private http: HttpClient) { }

  getAllDirections(){

    this.http
      .get(API_URL + '/api/directions')
      .subscribe(response => {
        let i = 0;
        response.json().forEach(direction => {
          this.directions[i] = String();
          this.directions[i] = direction;
          i++;
          return this.directions;
        });
      });
    return this.directions;
  }
}
