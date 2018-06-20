import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-booking-units',
  templateUrl: './booking-units.component.html',
  styleUrls: ['./booking-units.component.css']
})
export class BookingUnitsComponent implements OnInit {

    @Input() bookingUnitsPageable;
    @Output() prevEmitter = new EventEmitter<any>();
    @Output() nextEmitter = new EventEmitter<any>();
    @Output() advancedSearchEmitter = new EventEmitter<any>();
    private sortParam : string = '';
    private advancedSearchWrapper: any = {};
    private accomodationTypes : any[] = [];
    private accomodationCategories : any[] = [];
    private bonusFeatures : any[] = [];

    constructor(private searchService : SearchService) { }

    ngOnInit() {
        this.getAccomodationTypes();
        this.getAccomodationCategories();
        this.getBonusFeatures();
    }

    ngOnChanges(changes: SimpleChanges){
        if(changes.bookingUnitsPageable){
            this.bookingUnitsPageable = changes.bookingUnitsPageable.currentValue;
        }
    }

    sortByName(){
        this.sortParam='';
    }

    sortByPriceAscending(){
        this.sortParam = 'PriceAsc';
    }

    sortByPriceDescending(){
        this.sortParam = 'PriceDesc';
    }

    sortByRatingAscending(){
        this.sortParam = 'RatingAsc'; 
    }

    sortByRatingDescending(){
        this.sortParam = 'RatingDesc';
    }

    sortByCategoryAscending(){
        this.sortParam = 'CategoryAsc'; 
    }

    sortByCategoryDescending(){
        this.sortParam = 'CategoryDesc'; 
    }

    next(){
     this.nextEmitter.emit({page:this.bookingUnitsPageable.number+1,advancedSearchWrapper:this.advancedSearchWrapper});
    }

    prev(){
      this.prevEmitter.emit({page:this.bookingUnitsPageable.number-1,advancedSearchWrapper:this.advancedSearchWrapper});
    }

    executeAdvancedSearch(){
        this.advancedSearchEmitter.emit({page:0,advancedSearchWrapper:this.advancedSearchWrapper})
    }

    getAccomodationTypes(){
        this.searchService.getAllAccomodationTypes().subscribe((res:any)=>{
            if(res.success){
                this.accomodationTypes = res.responseBody;
            }
        })
    }

    getAccomodationCategories(){
        this.searchService.getAllAccomodationCategories().subscribe((res:any)=>{
            if(res.success){
                this.accomodationCategories = res.responseBody;
            }
        })
    }

    getBonusFeatures(){
        this.searchService.getAllBonusFeatures().subscribe((res:any)=>{
            if(res.success){
                this.bonusFeatures = res.responseBody;
            }
        })
    }

    bindAccomodationType(accomodationType: any){
        var index = this.containsElement(this.accomodationTypes, accomodationType);
        if(index==-1){
            this.accomodationTypes.push(accomodationType);
        }else{
            this.accomodationTypes.splice(index,1);
        }
      }
    
      bindAccomodationCategory(accomodationCategory: any){
        var index = this.containsElement(this.accomodationCategories, accomodationCategory);
        if(index==-1){
          this.accomodationCategories.push(accomodationCategory);
        }else{
          this.accomodationCategories.splice(index,1);
        }
      }

      bindBonusFeatures(bonusFeature: any){
        var index = this.containsElement(this.bonusFeatures, bonusFeature);
        if(index==-1){
          this.bonusFeatures.push(bonusFeature);
        }else{
          this.bonusFeatures.splice(index,1);
        }
      }
    
      containsElement(list:any[],element:any):number{
        var index = 0;
        for(let e of list){
          if(e.id==element.id){
            return index;
          }
          index++;
        }
        return -1;
      }

}