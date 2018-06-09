import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenService {

  constructor(private httpClient: HttpClient) { }

  public headerSetup(): HttpHeaders{

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('token', localStorage.getItem('userToken'));

    return headers;
  }

  public login(val: any) : Observable<any>{
    let params = new HttpParams();
    params = params.append("username", val.username);
    params = params.append("password", val.password);

    return this.httpClient.post<any>("/rest/login", params);
  }

  public getUserFromToken() : Observable<any>{
    console.log('usloooo')
    return this.httpClient.get("/rest/getUserFromToken", {headers : this.headerSetup()});
  }

}
