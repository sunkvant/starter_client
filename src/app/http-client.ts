import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {TokenService} from './service/token.service';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class HttpClient extends Http {

  constructor (backend: XHRBackend, options: RequestOptions, private tokenService: TokenService, private route: Router) {
    super(backend, options);
    if(localStorage.getItem('access_token')) {
      const token = localStorage.getItem('access_token'); // your custom token getter function here
      options.headers.set('Authorization', `Bearer ${token}`);
    }
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {

    if(localStorage.getItem('access_token')) {
      const token = localStorage.getItem('access_token');
      if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
        if (!options) {
          // let's make option object
          options = {headers: new Headers()};
        }
        options.headers.set('Authorization', `Bearer ${token}`);
      } else {
        // we have to add the token to the url object
        url.headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return super.request(url, options).catch(this.catchAuthError(this, url, options));

  }

  get(url: string, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {


      return super.get(url, options);

  }

  post(url: string, body: any, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {


    return super.post(url, body, options);

  }


  private catchAuthError (self: HttpClient, url, options) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      if (res.status === 401 ) {
        // if not authenticated
        if (localStorage.getItem('refresh_token')) {
          return this.tokenService.refreshToken().flatMap((result: Response) => {
            // this.route.navigate([this.route.url]);
            if (result) {

              if (localStorage.getItem('access_token')) {
                const token = localStorage.getItem('access_token'); // your custom token getter function here
                url.headers.set('Authorization', `Bearer ${token}`);
              }
              //console.log(url);
              return super.request(url, options).catch(this.catchAuthError(this, url, options));

            }
          });
        }else{
          this.tokenService.logout();
        }
      }
      if( res.status === 403 || res.status === 400 ||  res.status === 404){
        document.location.href = '/404';
        return Observable.throw(res);
      }

      return Observable.throw(res);
    };
  }




}
