import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { AlertService } from '../../services/alert.service'

@Component({
  selector: 'app-all-reservations-preview',
  templateUrl: './all-reservations-preview.component.html',
  styleUrls: ['./reservation-preview.component.css']
})
export class AllReservationsPreviewComponent implements OnInit {

  private reservations: any[];  
  private pageNum: number;

  constructor(private reservationService: ReservationService, private alertService: AlertService) { }

  ngOnInit() {

    this.pageNum = 1;

    this.reservationService.getReservations(this.pageNum).subscribe((res: any) => {
        this.reservations = res.responseBody.content;
        console.log(this.reservations);
    })

  }

  next = function(){

    this.pageNum++;

    this.reservationService.getReservations(this.pageNum).subscribe((res: any) => {

      if(res.responseBody.content.length == 0){
        this.pageNum--;
        this.alertService.warn('Dosli ste do kraja pretrage.');
        return;
      }else{
        this.reservations = res.responseBody.content;
      }
    })

  }

  prev = function(){

    this.pageNum--;

    if(this.pageNum <= 0){
      this.pageNum++;
      return;
    }

    this.reservationService.getReservations(this.pageNum).subscribe((res: any) => {
      this.reservations = res.responseBody.content;
    })

  }

}
