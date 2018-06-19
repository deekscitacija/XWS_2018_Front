import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()
export class UserService {

  constructor(private http:  HttpClient, private tokenService: TokenService) { }


  register(val: any){

    let params = new HttpParams();
    params = params.append("username", val.username);
    params = params.append("password", val.lozinka);
    params = params.append("ime", val.ime);
    params = params.append("prezime", val.prezime);
    params = params.append("grad", val.grad);
    params = params.append("drzava", val.drzava);
    params = params.append("adresa", val.adresa);
    params = params.append("email", val.email);
    params = params.append("telefon", val.telefon);
    params = params.append("postbroj", val.postbroj);
    params = params.append("tip", val.tip);
    
    return this.http.post<any>("/rest/register", params);
  }

  resetPasswordToken(val: any){

    let params = new HttpParams();
    params = params.append("username", val.username);

    return this.http.post<any>("/rest/resetPass", params);
  }

  checkToken(val: any){

    let params = new HttpParams();
    params = params.append("username", val.username);
    params = params.append("codeToken", val.codeToken);

    return this.http.post<any>("/rest/checkToken", params);
  }

  changePassword(val: any){

    let params = new HttpParams();
    params = params.append("username", val.username);
    params = params.append("newPass", val.lozinka);

    return this.http.post<any>("/rest/changePass", params);
  }

  changePersonalInfo(val: any){
    
    return this.http.put<any>("/rest/secured/changePersonalInfo", val, {headers : this.tokenService.headerSetup()});
  }

}
