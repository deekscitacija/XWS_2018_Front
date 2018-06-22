import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { AlertService } from '../../services/alert.service';
import { CloudRatingService } from '../../services/cloud-rating.service';

@Component({
  selector: 'app-all-reservations-preview',
  templateUrl: './all-reservations-preview.component.html',
  styleUrls: ['./reservation-preview.component.css']
})
export class AllReservationsPreviewComponent implements OnInit {

  // 0 : rezervacije, 1: potvrdjene rezervacije
  @Input() mode: number;

  private reservations: any[] = [];  
  private pageNum: number;

  constructor(private reservationService: ReservationService, private alertService: AlertService,
                private cloudRatingService: CloudRatingService) { }

  ngOnInit() {

    this.pageNum = 1;
    this.loadReservations();
  }

  next = function(){

    this.pageNum++;
    this.loadReservations();
  }

  prev = function(){

    this.pageNum--;

    if(this.pageNum <= 0){
      this.pageNum++;
      return;
    }

    this.loadReservations();
  }

  refreshInput = function(val: any){
    this.loadReservations();
  }

  loadReservations(){

    this.reservationService.getReservations(this.pageNum, this.mode).subscribe(
      (res: any) => {
        
        if(res.responseBody.content.length == 0){
          this.pageNum--;
          this.alertService.warn('Dosli ste do kraja pretrage.');
          return;
        }else{
          this.reservations = res.responseBody.content;
        }

        if(this.mode == 1 && this.reservations.length > 0){
          this.bindRatings();
        }

      },
      (error: any) => {
        this.alertService.warn('Greska prilikom preuzimanja rezervacija.');
      }
    );

  }

  bindRatings(){
    
    if(this.reservations.length == 0){
      return;
    }

    let idList: number[] = [];

    this.reservations.forEach(function (tempRes) {
      idList.push(tempRes.id);
    });

    let reqParam = { "reservationList" : idList }

    this.cloudRatingService.getRatingsForReservationList(reqParam).subscribe(

      (res: any) => {
        
        if(res.length > 0){
          this.reservations.forEach(function (tempRes) {
            res.forEach(function (tempRating) {
              if(tempRating.reservation_id == tempRes.id){
                tempRes['rating'] = tempRating.rating;
                tempRes['comment'] = tempRating.comment;
              }
            })
          })
        }
        
      },
      (error: any) => {
        this.alertService.warn('Greska prilikom preuzimanja rezervacija.');
      }

    );
  }

}
