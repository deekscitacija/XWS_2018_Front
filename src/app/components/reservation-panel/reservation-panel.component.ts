import { Component, OnInit } from '@angular/core';
import { BookingUnitService } from '../../services/booking-unit.service';
import { TokenService } from '../../services/token.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-panel',
  templateUrl: './reservation-panel.component.html',
  styleUrls: ['./reservation-panel.component.css']
})
export class ReservationPanelComponent implements OnInit {

  private optradio: boolean;
  private subjectName: string;
  private subjectSurname: string;

  private regUser = {name : "Pera", surname: "Peric"};

  constructor(private bookingUnitService: BookingUnitService, private tokenService: TokenService, private reservationService: ReservationService) { }

  ngOnInit() {

    this.optradio = true;

    this.tokenService.getUserFromToken().subscribe((res: any) => {
      this.regUser = res.responseBody;
    })

    this.bookingUnitService.getPriceForUnit(1, 1, 2018).subscribe((res: any)=>{
      console.log(res)
    })

    this.bookingUnitService.getTotalPrice(1, new Date(2018,6,10), new Date(2018,6,15), null).subscribe((res: any)=>{
      console.log(res)
    })
  }

  changeOption = function(val: boolean){
    this.optradio = val;

    if(this.optradio == true){
      this.subjectName = this.regUser.name;
      this.subjectSurname = this.regUser.surname;
    }else{
      this.subjectName = "";
      this.subjectSurname = "";
    }
  }

  potvrdiRezervaciju = function(){

    let reservation = {
                        bookingUnit: null, 
                        confirmed: false, 
                        fromDate : new Date(2018,2,10), 
                        toDate : new Date(2018,2,15), 
                        registeredUser : null, 
                        subjectName : "Pera",
                        subjectSurname : "Peric",
                        totalPrice: 100 
                      }

    this.reservationService.submitReservation(1, reservation).subscribe((res: any) => {
      console.log(res);
    })

  }

}
