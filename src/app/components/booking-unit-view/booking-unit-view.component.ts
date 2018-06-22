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
  private bookingUnit : any;
  private images : any[] = [];

  private isReservation: boolean = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.bookingUnitId=params['bookingUnitId'];
    });

    this.getBookingUnit();
  }

  private getBookingUnit(){
    this.searchService.getBookingUnit(this.bookingUnitId).subscribe((res:any)=>{
      if(res.success){
        this.bookingUnit = res.responseBody;
        if(this.bookingUnit){
          this.addImages(this.bookingUnit);
        }
      }
    })
  }

  addImages(bookingUnit:any){
    for(let bookingUnitPicture of bookingUnit.bookingUnit.pictures){
        this.getImage(bookingUnitPicture.value);
    }
}

getImage(path:string){
    this.searchService.getImage(path).subscribe((res:any)=>{
        this.images.push(URL.createObjectURL(res));
    })
}

  openCloseReservationPanel(){
    this.isReservation = !this.isReservation;
  }

  checkIfLoggedIn(){
    if(localStorage.getItem('userToken')){
      return false;
    }else{
      return true;
    }
  }

}
