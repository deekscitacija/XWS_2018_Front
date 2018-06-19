import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()
export class BookingUnitService {

  constructor(private http:  HttpClient, private tokenService: TokenService) { }

  getPriceForUnit(unitId: number, month: number, year: number){

    let params = new HttpParams();
    params = params.append("unitId", String(unitId));
    params = params.append("month", String(month));
    params = params.append("year", String(year));

    return this.http.get("rest/getPriceForUnit", {params: params});
  }

  getTotalPrice(unitId: number, fromDate: Date, toDate: Date, currentDate: Date){

    let params = {unitId : unitId, fromDate : fromDate, toDate : toDate, currentDate : currentDate };

    return this.http.post("rest/calculateTotalPrice", params);
  }

}
