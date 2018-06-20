import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-booking-units',
  templateUrl: './booking-units.component.html'
})
export class BookingUnitsComponent implements OnInit {

    @Input() bookingUnitsPageable;

    constructor() { }

    ngOnInit() {
    
    }


}