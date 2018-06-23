import { Component, OnInit, Input } from '@angular/core';
import { BookingUnitService } from '../../services/booking-unit.service';
import { TokenService } from '../../services/token.service';
import { ReservationService } from '../../services/reservation.service';
import { DatePipe } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-reservation-panel',
  templateUrl: './reservation-panel.component.html',
  styleUrls: ['./reservation-panel.component.css']
})
export class ReservationPanelComponent implements OnInit {

  @Input() bookingUnit;
  @Input() dateFrom : any;
  @Input() dateTo : any;
  private optradio: boolean;
  private subjectName: string;
  private subjectSurname: string;
  private currentDate : string = "";
  private totalPrice : number = 0;

  private regUser = {name : "", surname: ""};

  constructor(private bookingUnitService: BookingUnitService, private tokenService: TokenService, private reservationService: ReservationService, private datePipe : DatePipe, private alertService : AlertService) { }

  ngOnInit() {

    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); 
    if(this.dateFrom!="" && this.dateTo!=""){
      this.calculateTotalPrice();
    }
    this.optradio = true;

    this.tokenService.getUserFromToken().subscribe((res: any) => {
      this.regUser = res.responseBody;
      this.subjectName = this.regUser.name;
      this.subjectSurname = this.regUser.surname;
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
                        bookingUnit: this.bookingUnit, 
                        registeredUser : null, 
                        subjectName : this.subjectName,
                        subjectSurname : this.subjectSurname,
                        totalPrice: this.totalPrice 
                      }

    this.reservationService.submitReservation(this.bookingUnit.bookingUnit.id,this.dateFrom, this.dateTo, reservation).subscribe((res: any) => {
      if(res.success){
        this.alertService.success(res.message);
      }else{
        this.alertService.error(res.message);
      }
    })

  }

  canReserve(){

    if(!this.dateFrom || !this.dateTo){
      return false;
    }

    if(!this.optradio){
      if(this.subjectName=='' || this.subjectSurname==''){
        return false;
      }
    }

    return true;
  }

  calculateTotalPrice(){
    
    if(this.dateFrom && this.dateTo){
      this.bookingUnitService.getTotalPrice(this.bookingUnit.bookingUnit.id, this.dateFrom, this.dateTo, null).subscribe((res: any)=>{
        if(res.success){
          this.totalPrice = res.responseBody;
        }
      })
    }   
  }

}
