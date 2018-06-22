import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { AdvancedSearchDialogComponent } from '../advanced-search-dialog/advanced-search-dialog.component';
import { Router } from '@angular/router';
import { CloudRatingService } from '../../services/cloud-rating.service';

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
    private ratings : any[] = [];
    
    constructor(private advancedSearchDialog: MatDialog, private searchService : SearchService, private router : Router, private cloudRatingService : CloudRatingService) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges){
        if(changes.bookingUnitsPageable){
            this.bookingUnitsPageable = changes.bookingUnitsPageable.currentValue;
            if(this.bookingUnitsPageable){
                this.addImages(this.bookingUnitsPageable.content);
                this.getRatings();
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

    viewBookingUnit(bookingUnitId:string){
        this.router.navigate(['bookingUnit/'+bookingUnitId]);
    }

    getRatings(){
        var bookingUnitIds = [];
        for(let bookingUnit of this.bookingUnitsPageable.content){
            bookingUnitIds.push(bookingUnit.bookingUnit.id);
        }

        let val = {
            "unitsList" : bookingUnitIds
        }
        
        this.cloudRatingService.getRatingsForUnits(val).subscribe(
            (res:any)=>{
                for(let bookingUnitId of res){
                    this.bookingUnitsPageable.content[this.containsElement(this.bookingUnitsPageable.content,bookingUnitId.booking_unit_id)].rating = bookingUnitId.rating;
                }
            },
            (err: any) => {
                console.log('Greska');
            }
        )

    }

    containsElement(list:any[],element:any):number{
        var index = 0;
        for(let e of list){
          if(e.bookingUnit.id==element){
            return index;
          }
          index++;
        }
        return -1;
      }


}