import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '../../../../node_modules/@angular/router';
import { Destination } from '../../models/destination';

@Component({
  selector: 'app-central',
  templateUrl: './central.component.html'
})
export class CentralComponent implements OnInit {

  private destinations : any[] = [];
  private destinationName : string = "";
  private dateFrom : any;
  private dateTo : any;
  private selectedDestination : Destination;
  private showDestinations : boolean = false;
  private submittedError = false;
  private peopleNumber : string = "";
  private invalidDestination : boolean = false;
  private showSearch : boolean = false;
  private bookingUnits : any[] = [];
  private resultsNumber : string = "";
  private currentDate : string = "";

  constructor(private searchService : SearchService, private datePipe : DatePipe, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); 
    this.showSearchResults();
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
    this.destinationName = this.setDestinationName(destination);
    this.selectedDestination = this.setSelectedDestination(destination);
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
      this.executeSearch({page:0,advancedSearchWrapper:{}});
    }
  }

  executeSearch(searchWrapper : any){

    var advancedSearchWrapper = searchWrapper.advancedSearchWrapper;
    
    var queryParams: Params = {'number' : this.resultsNumber, 
                               'peopleNumber' : this.peopleNumber, 
                               'dateFrom' : this.dateFrom, 
                               'dateTo' : this.dateTo,
                               'destinationType' : this.selectedDestination.getDestinationType(),
                               'destinationId' : this.selectedDestination.getDestinationId(),
                               'destinationName' : this.selectedDestination.getDestinationName()};

    if(advancedSearchWrapper.selectedAccomodationTypes && advancedSearchWrapper.selectedAccomodationTypes.length>0){
        queryParams['types'] = advancedSearchWrapper.selectedAccomodationTypes;
    }
    if(advancedSearchWrapper.selectedAccomodationCategories && advancedSearchWrapper.selectedAccomodationCategories.length>0){
        queryParams['categories'] = advancedSearchWrapper.selectedAccomodationCategories;
    }
    if(advancedSearchWrapper.selectedBonusFeatures && advancedSearchWrapper.selectedBonusFeatures.length>0){
      queryParams['bonusFeatures'] = advancedSearchWrapper.selectedBonusFeatures;
    }

    queryParams['pageNum'] = searchWrapper.page;

   this.router.navigate([''],{queryParams : queryParams});
  }  

  showSearchResults(){

    this.route.queryParamMap.subscribe((queryParams)=>{
      if(queryParams.has('number') && queryParams.has('peopleNumber') && queryParams.has('dateFrom') && queryParams.has('dateTo') && queryParams.has('pageNum') && queryParams.has('destinationType') && queryParams.has('destinationId') && queryParams.has('destinationName')){
        var pageNum = queryParams.get('pageNum');
        var number = queryParams.get('number');
        var peopleNumber = queryParams.get('peopleNumber');
        var dateFrom = queryParams.get('dateFrom');
        var dateTo = queryParams.get('dateTo');
        var destinationType = queryParams.get('destinationType');
        var destinationId = queryParams.get('destinationId');
        var destinationName = queryParams.get('destinationName');

        if(queryParams.has('types')){
          var selectedAccomodationTypes = queryParams.getAll('types');
        }
        if(queryParams.has('categories')){
          var selectedAccomodationCategories = queryParams.getAll('categories');
        }
        if(queryParams.has('bonusFeatures')){
          var selectedBonusFeatures = queryParams.getAll('bonusFeatures');
        }

        this.searchService.searchBookingUnits(+pageNum,+number,peopleNumber,dateFrom,dateTo,destinationType,destinationId,selectedAccomodationTypes,selectedAccomodationCategories,selectedBonusFeatures).
        subscribe((res:any)=>{
          if(res.success){
            this.bookingUnits = res.responseBody;
            this.showSearch = true;
            if(this.resultsNumber=="" && this.peopleNumber=="" && !this.dateFrom && !this.dateTo && this.destinationName==""){
              this.patchInputValues(number,peopleNumber,dateFrom,dateTo,destinationName,destinationType,destinationId);
            }          
          }
        })
      }else{
        this.bookingUnits = [];
        this.showSearch = false;
        this.patchInputValues("","","","","","","");
      }
    })
  }

  patchInputValues(number:string,peopleNumber:string,dateFrom:string,dateTo:string,destinationName:string,destinationType:string,destinationId:string){
    this.resultsNumber = number;
    this.peopleNumber = peopleNumber;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.destinationName = destinationName;
    if(destinationName!="" && destinationType!="" && destinationId!=""){
      this.selectedDestination = new Destination(destinationId,destinationName,destinationType);
    }  
  }

  setDestinationName(selectedDestination:any){
    if(selectedDestination.city){
      return selectedDestination.city.name;
    }else if(selectedDestination.country){
      return selectedDestination.country.name;
    }
  }

  setSelectedDestination(destination) : Destination{
    var destinationType = "";
    var destinationId = "";
    var destinationName = "";

    if(destination.city){
      destinationType = 'city';
      destinationId = destination.city.id;
      destinationName = destination.city.name;
    }else if(destination.country){
      destinationType = 'country';
      destinationId = destination.country.id;
      destinationName = destination.country.name;
    }

    return new Destination(destinationId,destinationName,destinationType);
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
    let num = 0;
    while(num<=100){
      array.push(num);
      num+=5;
    }

    return array;
  }
}
