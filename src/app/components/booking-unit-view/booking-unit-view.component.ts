import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-unit-view',
  templateUrl: './booking-unit-view.component.html',
  styleUrls: ['./booking-unit-view.component.css']
})
export class BookingUnitViewComponent implements OnInit {

  constructor(private searchService : SearchService,private route: ActivatedRoute) { }

  private bookingUnitId : string;

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.bookingUnitId=params['bookingUnitId'];
    });

    this.getBookingUnit();
  }

  private getBookingUnit(){
    this.searchService.getBookingUnit(this.bookingUnitId).subscribe((res:any)=>{
      if(res.success){
        console.log(res.responseBody);
      }
    })
  }

}
