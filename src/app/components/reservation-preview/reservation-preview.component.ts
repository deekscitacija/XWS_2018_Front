import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AlertService } from '../../services/alert.service';
import { ReservationService } from '../../services/reservation.service'; 
import { CloudRatingService } from '../../services/cloud-rating.service';

@Component({
  selector: 'app-reservation-preview',
  templateUrl: './reservation-preview.component.html',
  styleUrls: ['./reservation-preview.component.css']
})
export class ReservationPreviewComponent implements OnInit {

  @Input() reservation: any;
  @Input() mode: number;

  @Output() refreshInput : EventEmitter<any> = new EventEmitter<any>();

  private otkazivanje: boolean = false;
  private poruka: boolean = false;
  private ocenjivanje: boolean = false;
  private komentarisanje: boolean = false;

  private tekstPoruke: string = "";
  private tekstKomentara: string = "";
  private theOcena = 10;

  constructor(private messageService: MessageService, private alertService: AlertService, 
                private reservationService: ReservationService, private cloudRatingService: CloudRatingService) { }

  ngOnInit() {
  }

  checkIfValid(){
    
    if(new Date(this.reservation.fromDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) > new Date()){
      return true;
    }else{
      return false;
    }
  }

  otkazi = function(){
    this.otkazivanje = !this.otkazivanje;
    this.poruka = false;
    this.tekstPoruke = "";
  }

  otvoriZatvoriPoruku = function(){
    this.tekstPoruke = "";
    this.poruka = !this.poruka;
    this.otkazivanje = false;
  }

  potvrdiOtkazivanje = function(){
    
    this.reservationService.cancelReservation(this.reservation.id).subscribe(
      (res: any) => {
        this.triggerRefreshInput();
      },
      (error: any) => {
        this.alertService.error("Greska prilikom brisanja rezervacije.");
      }
    );

  }

  potvrdiPoruku = function(){

    this.messageService.sendMessageToAgent(this.reservation.id, this.tekstPoruke).subscribe(
      (res: any) => {
        if(res.success){
          this.alertService.success(res.message);
        }else{
          this.alertService.error(res.message);
        }
        this.poruka = false;
      },
      (error: any) => {
        this.alertService.error("Greska prilikom slanja poruke.");
        this.poruka = false;
      }
   );

  }

  otvoriOcena = function(){
    this.ocenjivanje = !this.ocenjivanje;
    this.komentarisanje = false;
    this.tekstKomentara = "";
  }

  otvoriKomentar = function(){
    this.komentarisanje = !this.komentarisanje;
    this.ocenjivanje = false;
    this.tekstKomentara = "";
  }

  potvrdiOcenjivanje = function(){
    
    let theRating = {
                      "booking_unit_id" : this.reservation.bookingUnit.id,
                      "reservation_id" : this.reservation.id,
                      "rating" : this.theOcena
                    };

    this.cloudRatingService.sendRating(theRating).subscribe(
      (res: any) => {
        this.alertService.success(res);
        this.ocenjivanje = false;
        this.triggerRefreshInput();
      },
      (error: any) => {
        this.alertService.error("Greska prilikom ocenjivanja boravka, pokusajte kasnije.");
      }
    );
  }

  potvrdiKomentarisanje = function(){

    let theComment = {
                      "booking_unit_id" : this.reservation.bookingUnit.id,
                      "reservation_id" : this.reservation.id,
                      "comment" : this.tekstKomentara
                    };
                 
    this.cloudRatingService.sendComment(theComment).subscribe(
      (res: any) => {
        this.alertService.success(res);
        this.komentarisanje = false;
        this.triggerRefreshInput();
      },
      (error: any) => {
        this.alertService.error("Greska prilikom komentarisanja boravka, pokusajte kasnije.");
      }
    );
  }

  triggerRefreshInput(){
    this.refreshInput.emit(null);
  }

}
