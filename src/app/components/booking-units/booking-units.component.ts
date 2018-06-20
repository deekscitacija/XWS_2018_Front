import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-booking-units',
  templateUrl: './booking-units.component.html',
  styleUrls: ['./booking-units.component.css']
})
export class BookingUnitsComponent implements OnInit {

    @Input() bookingUnitsPageable;
    private sortParam : string = '';

    constructor() { }

    ngOnInit() {
    
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

    }

    sortByRatingDescending(){

    }

    sortByCategoryAscending(){

    }

    sortByCategoryDescending(){

    }


}