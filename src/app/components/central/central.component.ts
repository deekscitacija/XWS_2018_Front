import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { DatePipe } from '@angular/common';

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
  private searchForm : any;
  private resultsNumber : string = "";
  private currentDate : string = "";

  constructor(private searchService : SearchService, private datePipe : DatePipe) { }

  ngOnInit() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); 
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
    this.destinationName = this.setDestinationName(this.selectedDestination);
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
      this.showSearch = false;
      this.searchForm = searchForm;
      this.executeSearch({page:0,advancedSearchWrapper:{}});
    }
  }

  executeSearch(searchWrapper : any){
    this.searchService.searchBookingUnits(searchWrapper.page,this.searchForm.form.controls['number'].value,this.searchForm.form.controls['peopleNumber'].value,this.searchForm.form.controls['datumOd'].value, this.searchForm.form.controls['datumDo'].value,
    this.selectedDestination, searchWrapper.advancedSearchWrapper).subscribe((res:any)=>{
      if(res.success){
        this.bookingUnits = res.responseBody;
        this.showSearch = true;
      }
    })
  }  

  setDestinationName(selectedDestination:any){
    if(selectedDestination.city){
      return selectedDestination.city.name;
    }else if(selectedDestination.country){
      return selectedDestination.country.name;
    }
  }

  peopleCounter() {
    let array = new Array();
    let num = 1;
    while(num<=15){
      array.push(num);
      num++;
    }

    return array;
  }

  numberCounter() {
    let array = new Array();
    let num = 5;
    while(num<=100){
      array.push(num);
      num+=5;
    }

    return array;
  }

}
