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

  public searchBookingUnits(page:number,num:number,peopleNumber:string,dateFrom:any,dateTo:any,destinationType:string,destinationId:string,selectedAccomodationTypes:any[],selectedAccomodationCategories:any[],selectedBonusFeatures:any[]){

    let params = new HttpParams();
    params = params.append('peopleNumber',peopleNumber);
    params = params.append('dateFrom',dateFrom);
    params = params.append('dateTo',dateTo);
    params = params.append(destinationType,destinationId);

    if(selectedAccomodationTypes && selectedAccomodationTypes.length>0){
      params = params.append('types',this.stringifyArray(selectedAccomodationTypes));
    }
    if(selectedAccomodationCategories && selectedAccomodationCategories.length>0){
      params = params.append('categories',this.stringifyArray(selectedAccomodationCategories));
    }
    if(selectedBonusFeatures && selectedBonusFeatures.length>0){
      params = params.append('bonusFeatures',this.stringifyArray(selectedBonusFeatures));
    }

    return this.http.get('rest/getBookingUnits/page='+page+'&num='+num,{params:params});
  }

  private stringifyArray(array : any[]){

    var retVal : string = "";

    var i : number = 0;
    for(let element of array){
        retVal += element;
        i++;
        if(i<array.length){
            retVal+=",";
        }        
    }
    return retVal;
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