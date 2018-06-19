import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()
export class ReservationService {

  constructor(private http:  HttpClient, private tokenService: TokenService) { }

  getReservations(pageNum: number, mode: number){

    return this.http.get("rest/secured/getUserReservations?pageNum="+pageNum+"&mode="+mode, {headers : this.tokenService.headerSetup()});
  }

  submitReservation(unitId: number, reservation: any){

    return this.http.post("/rest/secured/makeReservation/"+unitId, reservation, {headers : this.tokenService.headerSetup()});
  }

}
