import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-preview',
  templateUrl: './reservation-preview.component.html',
  styleUrls: ['./reservation-preview.component.css']
})
export class ReservationPreviewComponent implements OnInit {

  @Input() reservation: any;

  private otkazivanje: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  otkazi = function(){
    this.otkazivanje = !this.otkazivanje;
  }

  poruka = function(){

  }

  potvrdiOtkazivanje = function(){
    
  }

}
