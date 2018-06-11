import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()
export class ReservationService {

  constructor(private http:  HttpClient, private tokenService: TokenService) { }

  getReservations(pageNum: number){

    return this.http.get("rest/secured/getUserReservations?pageNum="+pageNum, {headers : this.tokenService.headerSetup()});
  }

}
