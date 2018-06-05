import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CityCountryService {

  constructor(private http: HttpClient) { }

  getAllCountries(){
      return this.http.get("/rest/getAllCountries");
  }

  getAllCities(){
    return this.http.get("/rest/getAllCities");
  }

  getCitiesByCountry(countryId: number){

    let params = new HttpParams();
    params = params.append("id", countryId.toString());
    return this.http.get("/rest/getCitiesByCountry", {params : params})
  }

}
