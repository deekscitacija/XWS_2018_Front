import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  public getCountriesAndCities(name:string){

      let params = new HttpParams();
      params = params.append('name',name);

      return this.http.get('rest/getCountriesAndCitiesSearch',{params:params});
  }

  public searchBookingUnits(page:number,peopleNumber:string,dateFrom:any,dateTo:any,selectedDestination:any,advancedSearchWrapper:any){

    let params = new HttpParams();
    params = params.append('peopleNumber',peopleNumber);
    params = params.append('dateFrom',dateFrom);
    params = params.append('dateTo',dateTo);

    if(selectedDestination.city){
      params = params.append('city',selectedDestination.city.id);
    }else if(selectedDestination.country){
      params = params.append('country',selectedDestination.country.id);
    }

    return this.http.post('rest/getBookingUnits/'+page,advancedSearchWrapper,{params:params});
  }

}