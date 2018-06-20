import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { DestinationNamePipe } from '../../pipes/destinationNamePipe';

@Component({
  selector: 'app-central',
  templateUrl: './central.component.html'
})
export class CentralComponent implements OnInit {

  private destinations : any[] = [];
  private destinationName : string = "";
  private dateFrom : any;
  private dateTo : any;
  private selectedDestination : any;
  private showDestinations : boolean = false;
  private submittedError = false;
  private peopleNumber : string = "";
  private invalidDestination : boolean = false;
  private showSearch : boolean = false;
  private bookingUnits : any[] = [];

  constructor(private searchService : SearchService, private destinationNamePipe : DestinationNamePipe) { }

  ngOnInit() {
    
  }

  getCitiesAndCountries(){
    this.invalidDestination = false;
    if(this.destinationName!=""){
      this.searchService.getCountriesAndCities(this.destinationName).subscribe((res:any)=>{
        if(res.success){
          this.destinations = res.responseBody;
          if(this.destinations.length>0){
            this.showDestinations = true;
            this.selectedDestination = null;
          }else{
            this.showDestinations = false;
          }
        }
      });   
    }else{
      this.showDestinations = false;
    }  
  }

  selectDestination(destination:any){
    this.selectedDestination = destination;
    this.destinationName = this.destinationNamePipe.transform(this.selectedDestination);
    this.showDestinations = false;
    this.invalidDestination = false;
  }

  search(searchForm){
    if(!searchForm.valid){
      this.submittedError = true;
    }else{
      if(!this.selectedDestination && !this.showDestinations){
        this.submittedError = true;
        this.invalidDestination = true;
        return;
      }else if(!this.selectedDestination && this.showDestinations){
        this.selectDestination(this.destinations[0]);
      }
      this.executeSearch(searchForm,{},1);
    }
  }

  executeSearch(searchForm:any,advancedSearchWrapper:any,page:number){

    this.searchService.searchBookingUnits(page,searchForm.form.controls['peopleNumber'].value,searchForm.form.controls['datumOd'].value, searchForm.form.controls['datumDo'].value,
    this.selectedDestination,advancedSearchWrapper).subscribe((res:any)=>{
      if(res.success){
        this.bookingUnits = res.responseBody;
        this.showSearch = true;
      }
    })
  }
  

  counter() {
    let array = new Array();
    let num = 1;
    while(num<=15){
      array.push(num);
      num++;
    }

    return array;
  }

}
