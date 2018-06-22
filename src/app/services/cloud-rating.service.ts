import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CloudRatingService {

  constructor(private http:  HttpClient) { }

  getRatingForUnit(id: number){
    let azureFunctionUrl: string = "api/GetRating/";
    let azureFunctionCode: string = "?code=NjU116zMC4D1ZEoOLrkHfoWKNPCafW7ky/6ow6OF6AN5AH/f23pX8A==";

    return this.http.get(azureFunctionUrl+id+azureFunctionCode);
  }

  sendRating(val: any){
    let azureFunctionUrl: string = "api/SubmitRating?code=R0/0amxxD2iRsR2oRDzaaQZFNFzsZXgcCOBTcqTFV9wKlInsogrIlw==";

    return this.http.post(azureFunctionUrl, val);
  }

  sendComment(val: any){
    let azureFunctionUrl: string = "api/SubitComment?code=QZqOvaL0iXhocE/aniu/FVOU4hzoH1kq0S/FLbMAJxhq4jasMsaf7Q=="

    return this.http.post(azureFunctionUrl, val);
  }

  getRatingsForReservationList(val: any){
    let azureFunctionUrl: string = "api/GetListOfRatings?code=ElmnHqlE8dWNKxRpzoBjnm2MZPoj9rK5ayzTIP3lXsIfGf25QGCo0A==";

    return this.http.post(azureFunctionUrl, val);
  }

  getRatingsForUnitList(val: any){
    let azureFunctionUrl: string = "api/GetListOfRatings?code=ElmnHqlE8dWNKxRpzoBjnm2MZPoj9rK5ayzTIP3lXsIfGf25QGCo0A==";

    return this.http.post(azureFunctionUrl, val);
  }

}
