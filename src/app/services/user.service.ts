import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http:  HttpClient) { }


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
    
    return this.http.post<any>("/rest/register", params);
  }

}
