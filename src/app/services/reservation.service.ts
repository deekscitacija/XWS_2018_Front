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

  submitReservation(unitId: string, dateFrom : string, dateTo: string, reservation: any){

    var params = new HttpParams();
    params = params.append('unitId',unitId);
    params = params.append('dateFrom',dateFrom);
    params = params.append('dateTo',dateTo);

    return this.http.post("/rest/secured/makeReservation", reservation, {params : params, headers : this.tokenService.headerSetup()});
  }

  cancelReservation(reservationId: number){

    return this.http.delete("/rest/secured/cancelReservation/"+reservationId, {headers : this.tokenService.headerSetup()});
  }

}
