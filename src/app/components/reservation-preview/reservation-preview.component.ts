import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AlertService } from '../../services/alert.service';
import { ReservationService } from '../../services/reservation.service'; 

@Component({
  selector: 'app-reservation-preview',
  templateUrl: './reservation-preview.component.html',
  styleUrls: ['./reservation-preview.component.css']
})
export class ReservationPreviewComponent implements OnInit {

  @Input() reservation: any;
  @Input() mode: number;

  private otkazivanje: boolean = false;
  private poruka: boolean = false;

  private tekstPoruke: string = "";

  constructor(private messageService: MessageService, private alertService: AlertService, private reservationService: ReservationService) { }

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
          window.location.reload();
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

}
