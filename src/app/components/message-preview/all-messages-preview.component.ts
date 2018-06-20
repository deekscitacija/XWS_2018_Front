import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { AlertService } from '../../services/alert.service'

@Component({
  selector: 'app-all-messages-preview',
  templateUrl: './all-messages-preview.component.html',
  styleUrls: ['./message-preview.component.css']
})
export class AllMessagesPreviewComponent implements OnInit {

  // 0 : primljene, 1: potvrdjene rezervacije
  private mode: number;
  private messages: any[] = [];  
  private pageNum: number;

  constructor(private messageService: MessageService, private alertService: AlertService) { }

  ngOnInit() {

    this.pageNum = 1;
    this.mode = 0;

    this.messageService.getMyMessages(this.pageNum, this.mode).subscribe(
      (res: any) => {
        this.messages = res.responseBody.content;
      },
      (error: any) => {
        this.alertService.warn('Greska prilikom preuzimanja rezervacija.');
      }
    )

  }

  next = function(){

    this.pageNum++;

    this.messageService.getMyMessages(this.pageNum, this.mode).subscribe((res: any) => {
      if(res.responseBody.content.length == 0){
        this.pageNum--;
        this.alertService.warn('Dosli ste do kraja pretrage.');
        return;
      }else{
        this.messages = res.responseBody.content;
      }
    })
  }

  prev = function(){
    this.pageNum--;

    if(this.pageNum <= 0){
      this.pageNum++;
      return;
    }

    this.messageService.getMyMessages(this.pageNum, this.mode).subscribe((res: any) => {
        this.messages = res.responseBody.content;
    });
  }

  loadMessages = function(){
    this.pageNum = 1;
    this.messageService.getMyMessages(this.pageNum, this.mode).subscribe((res: any) => {
        this.messages = res.responseBody.content;
    });
  }

}
