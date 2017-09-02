import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Headers, Http} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {window} from 'rxjs/operator/window';

const OAUTH_TOKEN_URL = environment.oauthTokenUrl;
const CLIENT_ID = environment.clientId;
const CLIENT_SECRET = environment.clientSecret;
const OAUTH_CHECK_TOKEN_URL = environment.oauthCheckTokenUrl;
@Injectable()
export class TokenService {
  private responseCode: number;

  constructor(private http: Http, private router: Router ) {}

  getToken(username, password) {

    const params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', username);
    params.set('password', password);

    const body = params.toString();

    const headers: Headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

   return this.http.post(OAUTH_TOKEN_URL, body, {
      headers: headers
    }).map(
      response => {
        localStorage.setItem('access_token', response.json().access_token);
        localStorage.setItem('refresh_token', response.json().refresh_token);

       /* params = new URLSearchParams();
        params.set('token',  response.json().access_token);
        body = params.toString();
        this.http.post(OAUTH_CHECK_TOKEN_URL, body, {
          headers: headers
        })
          .subscribe(checkToken =>{
          console.log(checkToken);
        });

        localStorage.setItem('uid', response.json().user_id);*/

       document.location.href = '/profile';

       // this.router.navigate(['/profile/']);

        return this.responseCode = response.status;
    },
      error => {
        this.router.navigate(['/login', { error: true }]);
        return this.responseCode = error.status;
      }
    );

  }

  refreshToken(): Observable<any>{
    if (localStorage.getItem('refresh_token')) {
      const params: URLSearchParams = new URLSearchParams();
      params.set('grant_type', 'refresh_token');
      params.set('refresh_token', localStorage.getItem('refresh_token'));

      const body = params.toString();

      const headers: Headers = new Headers();
      headers.append('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET));
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post(OAUTH_TOKEN_URL, body, {
        headers: headers
      }).map(
        response => {
          localStorage.setItem('access_token', response.json().access_token);
          localStorage.setItem('refresh_token', response.json().refresh_token);
          localStorage.setItem('uid', response.json().user_id);
          const returnedBody: any = response.json();
          return true;
        }
      ).catch(error => {
        this.logout();
        return Observable.throw(error);
      });
    }else{
      document.location.href = '/login';
      //this.router.navigate(['login']);
    }
  }

  logout(){
    localStorage.clear();
    document.location.href = '/login';
    //this.router.navigate(['login']);
  }

}
