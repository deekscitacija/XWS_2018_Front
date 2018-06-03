import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title: string = 'app';

  constructor(private loginDialog: MatDialog, private registerDialog: MatDialog) { }

  ngOnInit() {

  }


  login = function(){

    let dialogRefLogin = this.loginDialog.open(LoginDialogComponent, {
      data: 'pozdraaaava'
    })

    dialogRefLogin.afterClosed().subscribe((result:any) => {
      console.log(result)
    })
  
  }

  register = function(){

  }
}
