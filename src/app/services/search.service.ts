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

  public searchBookingUnits(page:number,num:number,peopleNumber:string,dateFrom:any,dateTo:any,selectedDestination:any,advancedSearchWrapper:any){

    let params = new HttpParams();
    params = params.append('peopleNumber',peopleNumber);
    params = params.append('dateFrom',dateFrom);
    params = params.append('dateTo',dateTo);

    if(selectedDestination.city){
      params = params.append('city',selectedDestination.city.id);
    }else if(selectedDestination.country){
      params = params.append('country',selectedDestination.country.id);
    }

    return this.http.post('rest/getBookingUnits/page='+page+'&num='+num,advancedSearchWrapper,{params:params});
  }

  public getAllAccomodationTypes(){
    return this.http.get('rest/getAllAccomodationTypes');
  }

  public getAllAccomodationCategories(){
    return this.http.get('rest/getAllAccomodationCategories');
  }

  public getAllBonusFeatures(){
    return this.http.get('rest/getAllBonusFeatures');
  }

  public getImage(path:string){
    let params = new HttpParams();
    params = params.append('path',path);

    return this.http.get('rest/getImage/',{params:params,responseType: 'blob'});
  }

  public getBookingUnit(id:string){

    let params = new HttpParams();
    params = params.append('bookingUnitId',id);

    return this.http.get('rest/getBookingUnit', {params:params});
  }

  public getCommentsForBookingUnit(id:number){

    return this.http.get('rest/getCommentsForBookingUnit/'+id);
  }

}