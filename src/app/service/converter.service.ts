import { Injectable } from '@angular/core';

@Injectable()
export class ConverterService {

  constructor() { }
  objToQuerry(obj) {
    let parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if(obj[key]!==null){
          parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
      }
    }
    return "?" + parts.join('&');
  }

}
