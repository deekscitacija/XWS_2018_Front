import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()
export class MessageService {

  constructor(private http:  HttpClient, private tokenService: TokenService) { }

  sendMessageToAgent(reservationId: number, messageContent: string){

    return this.http.post("/rest/secured/sendMessageToAgent/"+reservationId, messageContent, {headers : this.tokenService.headerSetup()});
  }

  getMyMessages(pageNum: number, mode: number){
    
    return this.http.get("/rest/secured/getUserMessages/"+pageNum+"/"+mode, {headers : this.tokenService.headerSetup()});
  }

  

}
