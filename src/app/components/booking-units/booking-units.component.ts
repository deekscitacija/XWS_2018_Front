import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { AdvancedSearchDialogComponent } from '../advanced-search-dialog/advanced-search-dialog.component';

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
    private selectedAccomodationTypes : any[] = [];
    private selectedAccomodationCategories : any[] = [];
    private selectedBonusFeatures: any[] = [];
    private images : any[] = [];
    
    constructor(private advancedSearchDialog: MatDialog, private searchService : SearchService) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges){
        if(changes.bookingUnitsPageable){
            this.bookingUnitsPageable = changes.bookingUnitsPageable.currentValue;
            if(this.bookingUnitsPageable){
                this.addImages(this.bookingUnitsPageable.content);
            }      
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

    otvoriNaprednu = function(){

        let dialogRef = this.advancedSearchDialog.open(AdvancedSearchDialogComponent , {
            data: {selectedAccomodationTypes: this.selectedAccomodationTypes, selectedAccomodationCategories : this.selectedAccomodationCategories, selectedBonusFeatures : this.selectedBonusFeatures},
            disableClose: false,
            panelClass: 'custom-dialog-container'
        });

        dialogRef.afterClosed().subscribe( (result:any) => {
            if(result != null){
              this.advancedSearchWrapper.selectedAccomodationTypes = this.selectedAccomodationTypes;
              this.advancedSearchWrapper.selectedAccomodationCategories = this.selectedAccomodationCategories;
              this.advancedSearchWrapper.selectedBonusFeatures = this.selectedBonusFeatures;
              this.executeAdvancedSearch();
            }
          })
    }

    addImages(bookingUnits:any){
        for(let bookingUnitDTO of bookingUnits){
            this.getImage(bookingUnitDTO.bookingUnit.pictures[0].value);
        }
    }

    getImage(path:string){
        this.searchService.getImage(path).subscribe((res:any)=>{
            this.images.push(URL.createObjectURL(res));
        })
    }

}